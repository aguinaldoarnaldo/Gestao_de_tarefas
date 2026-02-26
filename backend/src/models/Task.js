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
    
    for (let task of rows) {
      task.membros = await Task.getMembers(task.id);
    }
    
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM tarefa WHERE id = ?', [id]);
    return rows[0];
  },

  getByUserId: async (userId) => {
    const [rows] = await db.query('SELECT * FROM tarefa WHERE utilizador_id = ?', [userId]);
    
    for (let task of rows) {
      task.membros = await Task.getMembers(task.id);
    }
    
    return rows;
  },

  getByBoardId: async (boardId) => {
    const [rows] = await db.query('SELECT * FROM tarefa WHERE quadro_id = ?', [boardId]);
    
    for (let task of rows) {
      task.membros = await Task.getMembers(task.id);
    }
    
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
  },

  addMember: async (taskId, userId) => {
    await db.query(
      'INSERT IGNORE INTO tarefa_membro (tarefa_id, utilizador_id) VALUES (?, ?)',
      [taskId, userId]
    );
  },

  removeMember: async (taskId, userId) => {
    await db.query(
      'DELETE FROM tarefa_membro WHERE tarefa_id = ? AND utilizador_id = ?',
      [taskId, userId]
    );
  },

  getMembers: async (taskId) => {
    const [rows] = await db.query(`
      SELECT u.id, u.nome, u.email, u.tipo 
      FROM utilizador u
      JOIN tarefa_membro tm ON u.id = tm.utilizador_id
      WHERE tm.tarefa_id = ?
    `, [taskId]);
    return rows;
  },

  removeMemberFromBoardTasks: async (boardId, userId) => {
    await db.query(`
      DELETE tm FROM tarefa_membro tm
      JOIN tarefa t ON tm.tarefa_id = t.id
      WHERE t.quadro_id = ? AND tm.utilizador_id = ?
    `, [boardId, userId]);
  }
};

module.exports = Task;
