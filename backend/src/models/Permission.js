const db = require('../config/database');

const Permission = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM permissao');
    return rows;
  },

  create: async (nome) => {
    const [result] = await db.query('INSERT INTO permissao (nome) VALUES (?)', [nome]);
    return result.insertId;
  },

  assignToUser: async (utilizador_id, permissao_id) => {
    await db.query(
      'INSERT INTO permissao_utilizador (utilizador_id, permissao_id) VALUES (?, ?)',
      [utilizador_id, permissao_id]
    );
  },

  removeFromUser: async (utilizador_id, permissao_id) => {
    await db.query(
      'DELETE FROM permissao_utilizador WHERE utilizador_id = ? AND permissao_id = ?',
      [utilizador_id, permissao_id]
    );
  },

  getByUserId: async (userId) => {
    const [rows] = await db.query(`
      SELECT p.* FROM permissao p
      JOIN permissao_utilizador pu ON p.id = pu.permissao_id
      WHERE pu.utilizador_id = ?
    `, [userId]);
    return rows;
  }
};

module.exports = Permission;
