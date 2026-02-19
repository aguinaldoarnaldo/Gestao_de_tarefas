const db = require('../config/database');

const Comment = {
  getByTask: async (taskId) => {
    const [rows] = await db.query('SELECT * FROM Comentario WHERE tarefa_id = ?', [taskId]);
    return rows;
  },
  
  create: async (commentData) => {
    const { texto, tarefa_id, utilizador_id } = commentData;
    const [result] = await db.query(
      'INSERT INTO Comentario (texto, tarefa_id, utilizador_id) VALUES (?, ?, ?)',
      [texto, tarefa_id, utilizador_id]
    );
    return result.insertId;
  }
};

module.exports = Comment;
