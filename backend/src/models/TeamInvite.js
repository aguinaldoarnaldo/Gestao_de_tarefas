const db = require('../config/database');

const TeamInvite = {
  create: async (data) => {
    const { equipa_id, utilizador_id, remetente_id } = data;
    const [result] = await db.query(
      'INSERT INTO convite_equipa (equipa_id, utilizador_id, remetente_id, status) VALUES (?, ?, ?, ?)',
      [equipa_id, utilizador_id, remetente_id, 'pendente']
    );
    return result.insertId;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM convite_equipa WHERE id = ?', [id]);
    return rows[0];
  },

  getByUserId: async (userId) => {
    const [rows] = await db.query(`
      SELECT ci.*, e.nome as equipa_nome, u.nome as remetente_nome
      FROM convite_equipa ci
      JOIN equipa e ON ci.equipa_id = e.id
      JOIN utilizador u ON ci.remetente_id = u.id
      WHERE ci.utilizador_id = ? AND ci.status = 'pendente'
    `, [userId]);
    return rows;
  },

  updateStatus: async (id, status) => {
    await db.query('UPDATE convite_equipa SET status = ? WHERE id = ?', [status, id]);
  },

  checkPending: async (teamId, userId) => {
    const [rows] = await db.query(
      'SELECT id FROM convite_equipa WHERE equipa_id = ? AND utilizador_id = ? AND status = ?',
      [teamId, userId, 'pendente']
    );
    return rows.length > 0;
  }
};

module.exports = TeamInvite;
