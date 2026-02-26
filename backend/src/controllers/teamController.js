const Team = require('../models/Team');

const checkTeamOwnership = async (teamId, userId) => {
  const team = await Team.getById(teamId);
  if (!team) return false;
  return Number(team.lider_id) === Number(userId);
};

exports.createTeam = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const teamId = await Team.create({
      nome,
      descricao,
      criador_id: req.user.id
    });
    
    // Adiciona o criador como membro automático da equipa
    await Team.addMember(teamId, req.user.id);
    
    res.status(201).json({ message: 'Equipa criada com sucesso!', teamId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar equipa.' });
  }
};

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.getAll(req.user.id);
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar equipas.' });
  }
};

exports.getTeamMembers = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Basic access check: must be leader or member to see members
    const members = await Team.getMembers(id);
    const isMember = members.some(m => Number(m.id) === Number(req.user.id));
    const team = await Team.getById(id);
    const isLeader = team && Number(team.lider_id) === Number(req.user.id);
    const isAdmin = req.user.tipo === 'admin';

    if (!isLeader && !isMember && !isAdmin) {
      return res.status(403).json({ message: 'Acesso negado aos membros desta equipa.' });
    }

    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar membros da equipa.' });
  }
};

exports.addMemberToTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!await checkTeamOwnership(id, req.user.id) && req.user.tipo !== 'admin') {
      return res.status(403).json({ message: 'Apenas o líder da equipa pode adicionar membros.' });
    }

    await Team.addMember(id, userId);
    res.json({ message: 'Membro adicionado à equipa!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar membro à equipa.' });
  }
};

exports.removeMemberFromTeam = async (req, res) => {
  try {
    const { id, userId } = req.params;

    if (!await checkTeamOwnership(id, req.user.id) && req.user.tipo !== 'admin' && Number(userId) !== Number(req.user.id)) {
      return res.status(403).json({ message: 'Apenas o líder pode remover membros (ou o próprio membro sair).' });
    }

    await Team.removeMember(id, userId);
    res.json({ message: 'Membro removido da equipa!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao remover membro da equipa.' });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    if (!await checkTeamOwnership(id, req.user.id) && req.user.tipo !== 'admin') {
      return res.status(403).json({ message: 'Apenas o líder pode excluir a equipa.' });
    }

    await Team.delete(id);
    res.json({ message: 'Equipa excluída com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir equipa.' });
  }
};
