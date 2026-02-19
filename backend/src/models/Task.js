const db = require('../config/database');

const Task = {
  create: async (taskData) => {
    const { titulo, descricao, status, data_vencimento, utilizador_id } = taskData;
    const [result] = await db.query(
      'INSERT INTO Tarefa (titulo, descricao, status, data_vencimento, utilizador_id) VALUES (?, ?, ?, ?, ?)',
      [titulo, descricao, status, data_vencimento, utilizador_id]
    );
    return result.insertId;
  },

  getAll: async () => {
    const [rows] = await db.query(`
      SELECT t.*, u.nome as utilizador_nome 
      FROM Tarefa t 
      JOIN Utilizador u ON t.utilizador_id = u.id
    `);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM Tarefa WHERE id = ?', [id]);
    return rows[0];
  },

  getByUserId: async (userId) => {
    const [rows] = await db.query('SELECT * FROM Tarefa WHERE utilizador_id = ?', [userId]);
    return rows;
  },

  update: async (id, taskData) => {
    const { titulo, descricao, status, data_vencimento } = taskData;
    await db.query(
      'UPDATE Tarefa SET titulo = ?, descricao = ?, status = ?, data_vencimento = ? WHERE id = ?',
      [titulo, descricao, status, data_vencimento, id]
    );
  },

  delete: async (id) => {
    await db.query('DELETE FROM Tarefa WHERE id = ?', [id]);
  }
};

module.exports = Task;
