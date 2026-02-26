const db = require('../config/database');

const Board = {
  create: async (boardData) => {
    const { nome, descricao, criador_id } = boardData;
    const [result] = await db.query(
      'INSERT INTO quadro (titulo, descricao, utilizador_id) VALUES (?, ?, ?)',
      [nome, descricao, criador_id]
    );
    return result.insertId;
  },

  getAll: async (userId) => {
    const [rows] = await db.query(`
      SELECT DISTINCT q.*, q.titulo as nome, u.nome as criador_nome 
      FROM quadro q 
      JOIN utilizador u ON q.utilizador_id = u.id
      LEFT JOIN quadro_membro qm ON q.id = qm.quadro_id
      WHERE q.utilizador_id = ? OR qm.utilizador_id = ?
    `, [userId, userId]);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT *, titulo as nome FROM quadro WHERE id = ?', [id]);
    return rows[0];
  },

  getByUserId: async (userId) => {
    const [rows] = await db.query('SELECT *, titulo as nome FROM quadro WHERE utilizador_id = ?', [userId]);
    return rows;
  },

  addMember: async (boardId, userId) => {
    await db.query(
      'INSERT IGNORE INTO quadro_membro (quadro_id, utilizador_id) VALUES (?, ?)',
      [boardId, userId]
    );
  },

  removeMember: async (boardId, userId) => {
    await db.query(
      'DELETE FROM quadro_membro WHERE quadro_id = ? AND utilizador_id = ?',
      [boardId, userId]
    );
  },

  getMembers: async (boardId) => {
    const [rows] = await db.query(`
      SELECT u.id, u.nome, u.email, u.tipo 
      FROM utilizador u
      JOIN quadro_membro qm ON u.id = qm.utilizador_id
      WHERE qm.quadro_id = ?
    `, [boardId]);
    return rows;
  },

  update: async (id, boardData) => {
    const { nome, descricao } = boardData;
    await db.query(
      'UPDATE quadro SET titulo = ?, descricao = ? WHERE id = ?',
      [nome, descricao, id]
    );
  },

  delete: async (id) => {
    await db.query('DELETE FROM quadro WHERE id = ?', [id]);
  }
};

module.exports = Board;
