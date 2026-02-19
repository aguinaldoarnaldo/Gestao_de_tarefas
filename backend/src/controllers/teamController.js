const Team = require('../models/Team');

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.getAll();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar equipas.' });
  }
};
