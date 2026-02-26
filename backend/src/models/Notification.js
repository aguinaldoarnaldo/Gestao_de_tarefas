const db = require('../config/database');

const Notification = {
  create: async (data) => {
    const { utilizador_id, titulo, mensagem, tipo, link, referencia_id } = data;
    const [result] = await db.query(
      'INSERT INTO notificacao (utilizador_id, titulo, mensagem, tipo, link, referencia_id) VALUES (?, ?, ?, ?, ?, ?)',
      [utilizador_id, titulo, mensagem, tipo || 'sistema', link || null, referencia_id || null]
    );
    return result.insertId;
  },

  getByUserId: async (userId) => {
    const [rows] = await db.query(
      'SELECT * FROM notificacao WHERE utilizador_id = ? ORDER BY criado_em DESC',
      [userId]
    );
    return rows;
  },

  markAsRead: async (id) => {
    await db.query('UPDATE notificacao SET lido = 1 WHERE id = ?', [id]);
  },

  delete: async (id) => {
    await db.query('DELETE FROM notificacao WHERE id = ?', [id]);
  },

  markAllAsRead: async (userId) => {
    await db.query('UPDATE notificacao SET lido = 1 WHERE utilizador_id = ?', [userId]);
  }
};

module.exports = Notification;
