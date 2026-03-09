const db = require('../config/database');

const Task = {
  create: async (taskData) => {
    const { titulo, descricao, status, data_vencimento, utilizador_id, quadro_id, prioridade } = taskData;
    const [result] = await db.query(
      'INSERT INTO tarefa (titulo, descricao, status, data_vencimento, utilizador_id, quadro_id, prioridade) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [titulo, descricao, status, data_vencimento, utilizador_id, quadro_id, prioridade || 'Média']
    );
    return result.insertId;
  },

  getAll: async () => {
    const [rows] = await db.query(`
      SELECT t.*, u.nome as utilizador_nome 
      FROM tarefa t 
      JOIN utilizador u ON t.utilizador_id = u.id
    `);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM tarefa WHERE id = ?', [id]);
    return rows[0];
  },

  getByUserId: async (userId) => {
    const [rows] = await db.query('SELECT * FROM tarefa WHERE utilizador_id = ?', [userId]);
    return rows;
  },

  getByBoardId: async (boardId) => {
    const [rows] = await db.query(`
      SELECT t.*, COUNT(a.id) as total_anexos
      FROM tarefa t
      LEFT JOIN anexo a ON t.id = a.tarefa_id
      WHERE t.quadro_id = ?
      GROUP BY t.id
    `, [boardId]);
    return rows;
  },

  update: async (id, taskData) => {
    const { titulo, descricao, status, data_vencimento, quadro_id, prioridade } = taskData;
    await db.query(
      'UPDATE tarefa SET titulo = ?, descricao = ?, status = ?, data_vencimento = ?, quadro_id = ?, prioridade = ? WHERE id = ?',
      [titulo, descricao, status, data_vencimento, quadro_id, prioridade, id]
    );
  },

  delete: async (id) => {
    await db.query('DELETE FROM tarefa WHERE id = ?', [id]);
  }
};

module.exports = Task;
