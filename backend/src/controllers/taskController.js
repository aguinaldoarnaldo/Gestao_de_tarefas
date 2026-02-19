const Task = require('../models/Task');

// Helpers
const handleServerError = (res, error, message) => {
  console.error(error);
  res.status(500).json({ message });
};

const validateDueDate = (dateString) => {
  if (!dateString) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  const dueDate = new Date(dateString);
  return dueDate >= today;
};

// Actions
exports.createTask = async (req, res) => {
  try {
    const { titulo, descricao, status, data_vencimento } = req.body;
    const utilizador_id = req.user.id; // User ID from auth token

    if (!validateDueDate(data_vencimento)) {
      return res.status(400).json({ message: 'A data de vencimento deve ser uma data futura.' });
    }

    const taskId = await Task.create({
      titulo,
      descricao,
      status: status || 'Pendente',
      data_vencimento,
      utilizador_id
    });

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

// Alias para manter compatibilidade com rotas antigas
exports.getUserTasks = exports.getAllTasks;

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, status, data_vencimento } = req.body;
    const userId = req.user.id;

    const task = await Task.getById(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    // Verify ownership
    if (task.utilizador_id !== userId) {
      return res.status(403).json({ message: 'Acesso negado. Somente o criador pode editar esta tarefa.' });
    }

    if (!validateDueDate(data_vencimento)) {
      return res.status(400).json({ message: 'A data de vencimento deve ser uma data futura.' });
    }

    await Task.update(id, { titulo, descricao, status, data_vencimento });
    res.json({ message: 'Tarefa atualizada com sucesso!' });
  } catch (error) {
    handleServerError(res, error, 'Erro ao atualizar tarefa.');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await Task.getById(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    // Verify ownership
    if (task.utilizador_id !== userId) {
      return res.status(403).json({ message: 'Acesso negado. Somente o criador pode excluir esta tarefa.' });
    }

    await Task.delete(id);
    res.json({ message: 'Tarefa excluída com sucesso!' });
  } catch (error) {
    handleServerError(res, error, 'Erro ao excluir tarefa.');
  }
};
