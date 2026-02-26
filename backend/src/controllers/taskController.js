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
    const { titulo, descricao, status, data_vencimento, membros, quadro_id: qId, prioridade } = req.body;
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

    if (membros && Array.isArray(membros)) {
      for (const memberId of membros) {
        await Task.addMember(taskId, memberId);
        if (quadro_id) {
          await Board.addMember(quadro_id, memberId);
        }
      }
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
      
      // Access Logic: Creator or Board Member
      const board = await Board.getById(boardId);
      if (!board) return res.status(404).json({ message: 'Quadro não encontrado.' });
      
      const members = await Board.getMembers(boardId);
      const isMember = members.some(m => Number(m.id) === Number(userId));
      const isCreator = Number(board.utilizador_id) === Number(userId);
      const isAdmin = req.user.tipo === 'admin';
      
      if (!isCreator && !isMember && !isAdmin) {
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
    const { titulo, descricao, status, data_vencimento, membros, quadro_id: qId, prioridade } = req.body;
    const userId = req.user.id;
    const quadro_id = qId || null;

    logToFile(`Update Task Attempt: ${JSON.stringify({ id, userId, payload: req.body })}`);

    const task = await Task.getById(id);
    if (!task) {
      console.log('Task not found:', id);
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    const members = await Task.getMembers(id);
    const isMember = members.some(m => Number(m.id) === Number(userId));
    const isCreator = Number(task.utilizador_id) === Number(userId);
    const isAdmin = req.user.tipo === 'admin';

    if (!isCreator && !isMember && !isAdmin) {
      logToFile(`Access Denied: User ${userId} is not creator, member, or admin for task ${id}`);
      return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para editar esta tarefa.' });
    }

    const formattedDate = data_vencimento || null;

    if (!validateDueDate(formattedDate, task.data_vencimento)) {
      console.log('Invalid Due Date:', { formattedDate, current: task.data_vencimento });
      return res.status(400).json({ message: 'A data de vencimento deve ser uma data futura.' });
    }

    await Task.update(id, { 
      titulo: titulo || task.titulo, 
      descricao: descricao !== undefined ? descricao : task.descricao, 
      status: status || task.status, 
      data_vencimento: formattedDate, 
      quadro_id: quadro_id, 
      prioridade: prioridade || task.prioridade || 'Média'
    });

    if (membros && Array.isArray(membros)) {
      const currentTaskMembers = await Task.getMembers(id);
      for (const m of currentTaskMembers) {
        await Task.removeMember(id, m.id);
      }
      for (const memberId of membros) {
        await Task.addMember(id, memberId);
        if (quadro_id) {
          await Board.addMember(quadro_id, memberId);
        }
      }
    } else if (quadro_id && quadro_id !== task.quadro_id) {
      // Se apenas o quadro mudou, garante que os membros atuais tenham acesso ao novo quadro
      const currentTaskMembers = await Task.getMembers(id);
      for (const m of currentTaskMembers) {
        await Board.addMember(quadro_id, m.id);
      }
    }

    res.json({ message: 'Tarefa atualizada com sucesso!' });
  } catch (error) {
    logToFile(`CRITICAL ERROR updating task: ${error.stack || error.message}`);
    console.error('CRITICAL ERROR updating task:', error);
    handleServerError(res, error, 'Erro ao atualizar tarefa.');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.getById(id);
    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada.' });
    if (task.utilizador_id !== req.user.id) return res.status(403).json({ message: 'Acesso negado.' });

    await Task.delete(id);
    res.json({ message: 'Tarefa excluída com sucesso!' });
  } catch (error) {
    handleServerError(res, error, 'Erro ao excluir tarefa.');
  }
};

exports.addMemberToTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const task = await Task.getById(id);
    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada.' });
    if (task.utilizador_id !== req.user.id) return res.status(403).json({ message: 'Acesso negado.' });

    await Task.addMember(id, userId);
    if (task.quadro_id) {
      await Board.addMember(task.quadro_id, userId);
    }
    res.json({ message: 'Membro adicionado com sucesso!' });
  } catch (error) {
    handleServerError(res, error, 'Erro ao adicionar membro.');
  }
};

exports.getTaskMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const members = await Task.getMembers(id);
    res.json(members);
  } catch (error) {
    handleServerError(res, error, 'Erro ao buscar membros.');
  }
};
