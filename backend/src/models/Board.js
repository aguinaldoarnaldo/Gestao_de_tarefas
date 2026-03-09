const db = require('../config/database');

const Board = {
  create: async (boardData) => {
    const { nome, descricao, criador_id, foto_fundo } = boardData;
    const [result] = await db.query(
      'INSERT INTO quadro (titulo, descricao, utilizador_id, foto_fundo) VALUES (?, ?, ?, ?)',
      [nome, descricao, criador_id, foto_fundo]
    );
    return result.insertId;
  },

  getAll: async (userId) => {
    const [rows] = await db.query(`
      SELECT q.*, q.titulo as nome, u.nome as criador_nome 
      FROM quadro q 
      JOIN utilizador u ON q.utilizador_id = u.id
      WHERE q.utilizador_id = ?
    `, [userId]);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(`
      SELECT q.*, q.titulo as nome, u.nome as criador_nome 
      FROM quadro q 
      JOIN utilizador u ON q.utilizador_id = u.id
      WHERE q.id = ?
    `, [id]);
    return rows[0];
  },

  getByUserId: async (userId) => {
    const [rows] = await db.query('SELECT *, titulo as nome FROM quadro WHERE utilizador_id = ?', [userId]);
    return rows;
  },

  update: async (id, boardData) => {
    const { nome, descricao, foto_fundo } = boardData;
    await db.query(
      'UPDATE quadro SET titulo = ?, descricao = ?, foto_fundo = ? WHERE id = ?',
      [nome, descricao, foto_fundo, id]
    );
  },

  delete: async (id) => {
    await db.query('DELETE FROM quadro WHERE id = ?', [id]);
  }
};

module.exports = Board;
