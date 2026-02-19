const Permission = require('../models/Permission');

exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.getAll();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar permissões.' });
  }
};

exports.assignPermission = async (req, res) => {
  try {
    const { utilizador_id, permissao_id } = req.body;
    await Permission.assignToUser(utilizador_id, permissao_id);
    res.json({ message: 'Permissão atribuída com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atribuir permissão.' });
  }
};

exports.removePermission = async (req, res) => {
  try {
    const { utilizador_id, permissao_id } = req.body;
    await Permission.removeFromUser(utilizador_id, permissao_id);
    res.json({ message: 'Permissão removida com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover permissão.' });
  }
};
