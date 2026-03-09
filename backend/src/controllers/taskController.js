const Task = require('../models/Task');
const Board = require('../models/Board');
const fs = require('fs');
const path = require('path');

const logToFile = (msg) => {
  const logPath = path.join(__dirname, '../../debug.log');
  const d = new Date().toISOString();
  fs.appendFileSync(logPath, `[${d}] ${msg}\n`);
};

const handleServerError = (res, error, message) => {
  console.error(error);
  logToFile(`ERROR: ${message} - ${error.stack || error.message}`);
  res.status(500).json({ message });
};

const validateDueDate = (dateString, currentDueDate) => {
  if (!dateString) return true;
  
  const normalize = (d) => {
    if (!d) return null;
    if (d instanceof Date) return d.toISOString().slice(0, 10);
    if (typeof d === 'string') return d.slice(0, 10);
    return String(d).slice(0, 10);
  };

  if (normalize(dateString) === normalize(currentDueDate)) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(dateString);
  return dueDate >= today;
};

// Actions
exports.createTask = async (req, res) => {
  try {
    const { titulo, descricao, status, data_vencimento, quadro_id: qId, prioridade } = req.body;
    const utilizador_id = req.user.id;
    const quadro_id = qId || null;
    const formattedDate = data_vencimento || null;

    if (!validateDueDate(formattedDate)) {
      return res.status(400).json({ message: 'A data de vencimento deve ser uma data futura.' });
    }

    const taskId = await Task.create({
      titulo,
      descricao,
      status: status || 'Pendente',
      data_vencimento: formattedDate,
      utilizador_id,
      quadro_id,
      prioridade
    });

    const io = req.app.get('io');
    if (quadro_id) {
      io.to(`board_${quadro_id}`).emit('task_changed', { type: 'create', taskId });
    }

    res.status(201).json({ message: 'Tarefa criada com sucesso!', taskId });
  } catch (error) {
    handleServerError(res, error, 'Erro ao criar tarefa.');
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getByUserId(req.user.id);
    res.json(tasks);
  } catch (error) {
    handleServerError(res, error, 'Erro ao buscar tarefas.');
  }
};

exports.getTasksByBoard = async (req, res) => {
    try {
      const { boardId } = req.params;
      const userId = req.user.id;
      
      const board = await Board.getById(boardId);
      if (!board) return res.status(404).json({ message: 'Quadro não encontrado.' });
      
      const isCreator = Number(board.utilizador_id) === Number(userId);
      
      if (!isCreator) {
        return res.status(403).json({ message: 'Acesso negado a este quadro.' });
      }

      const tasks = await Task.getByBoardId(boardId);
      res.json(tasks);
    } catch (error) {
      handleServerError(res, error, 'Erro ao buscar tarefas do quadro.');
    }
  };

exports.getUserTasks = exports.getAllTasks;

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, status, data_vencimento, quadro_id: qId, prioridade } = req.body;
    const userId = req.user.id;

    const task = await Task.getById(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    const isCreator = Number(task.utilizador_id) === Number(userId);

    if (!isCreator) {
      return res.status(403).json({ message: 'Acesso negado. Apenas o criador pode editar esta tarefa.' });
    }

    const formattedDate = data_vencimento || null;

    if (!validateDueDate(formattedDate, task.data_vencimento)) {
      return res.status(400).json({ message: 'A data de vencimento deve ser uma data futura.' });
    }

    await Task.update(id, { 
      titulo: titulo || task.titulo, 
      descricao: descricao !== undefined ? descricao : task.descricao, 
      status: status || task.status, 
      data_vencimento: formattedDate, 
      quadro_id: qId !== undefined ? qId : task.quadro_id, 
      prioridade: prioridade || task.prioridade || 'Média'
    });

    const final_quadro_id = qId !== undefined ? qId : task.quadro_id;

    const io = req.app.get('io');
    if (final_quadro_id) {
        io.to(`board_${final_quadro_id}`).emit('task_changed', { type: 'update', taskId: id });
    }

    res.json({ message: 'Tarefa atualizada com sucesso!' });
  } catch (error) {
    handleServerError(res, error, 'Erro ao atualizar tarefa.');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.getById(id);
    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada.' });
    if (task.utilizador_id !== req.user.id) return res.status(403).json({ message: 'Acesso negado. Apenas o criador pode excluir esta tarefa.' });

    await Task.delete(id);
    
    const io = req.app.get('io');
    if (task.quadro_id) {
        io.to(`board_${task.quadro_id}`).emit('task_changed', { type: 'delete', taskId: id });
    }

    res.json({ message: 'Tarefa excluída com sucesso!' });
  } catch (error) {
    handleServerError(res, error, 'Erro ao excluir tarefa.');
  }
};
