const User = require('../models/User');
const Task = require('../models/Task');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Helper para tratar erros internos de forma consistente
const handleServerError = (res, error, message) => {
  console.error(error);
  res.status(500).json({ message });
};

// GET /api/users/profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    const permissions = await User.getPermissions(req.user.id);
    res.json({ ...user, permissions });
  } catch (error) {
    handleServerError(res, error, 'Erro ao buscar perfil.');
  }
};

// GET /api/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    handleServerError(res, error, 'Erro ao buscar usuários.');
  }
};

// PUT /api/users/:id
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, tipo } = req.body;
    
    const updateData = { nome, email, tipo };
    
    if (senha) {
      const salt = await bcrypt.genSalt(10);
      updateData.senha = await bcrypt.hash(senha, salt);
    }
    
    await User.update(id, updateData);
    res.json({ message: 'Utilizador atualizado com sucesso!' });
  } catch (error) {
    handleServerError(res, error, 'Erro ao atualizar utilizador.');
  }
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (userId === req.user.id) {
      return res.status(400).json({ message: 'Você não pode excluir sua própria conta.' });
    }
    
    await User.delete(id);
    res.json({ message: 'Utilizador excluído com sucesso!' });
  } catch (error) {
    handleServerError(res, error, 'Erro ao excluir utilizador.');
  }
};

// PUT /api/users/profile
exports.updateProfile = async (req, res) => {
  try {
    const { nome, email } = req.body;
    const userId = req.user.id;
    
    if (email) {
      const existingUser = await User.findByEmail(email);
      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({ message: 'Este email já está em uso por outro utilizador.' });
      }
    }
    
    await User.update(userId, { nome, email });
    const updatedUser = await User.findById(userId);
    
    res.json({
      message: 'Perfil atualizado com sucesso!',
      user: updatedUser
    });
  } catch (error) {
    handleServerError(res, error, 'Erro ao atualizar perfil.');
  }
};

// PUT /api/users/change-password
exports.changePassword = async (req, res) => {
  try {
    const { senhaAtual, novaSenha } = req.body;
    const userId = req.user.id;
    
    // Busca usuário com a senha hashada (findById padrão não retorna senha)
    const user = await User.findByIdWithPassword(userId);
    
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const isMatch = await bcrypt.compare(senhaAtual, user.senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha atual incorreta.' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(novaSenha, salt);
    
    await User.update(userId, { senha: hashedPassword });
    res.json({ message: 'Senha alterada com sucesso!' });
  } catch (error) {
    handleServerError(res, error, 'Erro ao alterar senha.');
  }
};

// GET /api/users/stats
exports.getUserStats = async (req, res) => {
  try {
    const tasks = await Task.getByUserId(req.user.id);
    
    const stats = {
      total: tasks.length,
      concluidas: tasks.filter(t => t.status === 'Concluída').length,
      emAndamento: tasks.filter(t => t.status === 'Em Andamento').length,
      pendentes: tasks.filter(t => t.status === 'Pendente').length
    };
    
    res.json(stats);
  } catch (error) {
    handleServerError(res, error, 'Erro ao buscar estatísticas.');
  }
};
