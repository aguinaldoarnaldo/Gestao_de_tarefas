const db = require('../config/database');

const Team = {
  create: async (teamData) => {
    const { nome, descricao, criador_id } = teamData;
    // Database uses lider_id and lowercase table name
    const [result] = await db.query(
      'INSERT INTO equipa (nome, descricao, lider_id) VALUES (?, ?, ?)',
      [nome, descricao, criador_id]
    );
    return result.insertId;
  },

  getAll: async (userId) => {
    // Joining with utilizador to get lead name, filtered by participation
    const [rows] = await db.query(`
      SELECT DISTINCT e.*, u.nome as criador_nome 
      FROM equipa e 
      JOIN utilizador u ON e.lider_id = u.id
      LEFT JOIN equipa_membro em ON e.id = em.equipa_id
      WHERE e.lider_id = ? OR em.utilizador_id = ?
    `, [userId, userId]);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM equipa WHERE id = ?', [id]);
    return rows[0];
  },

  addMember: async (teamId, userId) => {
    // Database uses equipa_membro
    await db.query(
      'INSERT IGNORE INTO equipa_membro (equipa_id, utilizador_id) VALUES (?, ?)',
      [teamId, userId]
    );
  },

  removeMember: async (teamId, userId) => {
    await db.query(
      'DELETE FROM equipa_membro WHERE equipa_id = ? AND utilizador_id = ?',
      [teamId, userId]
    );
  },

  getMembers: async (teamId) => {
    const [rows] = await db.query(`
      SELECT u.id, u.nome, u.email, u.tipo 
      FROM utilizador u
      JOIN equipa_membro em ON u.id = em.utilizador_id
      WHERE em.equipa_id = ?
    `, [teamId]);
    return rows;
  },

  delete: async (id) => {
    await db.query('DELETE FROM equipa WHERE id = ?', [id]);
  }
};

module.exports = Team;
