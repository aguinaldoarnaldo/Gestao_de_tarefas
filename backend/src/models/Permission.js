const db = require('../config/database');

const Permission = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM Permissao');
    return rows;
  },

  create: async (nome) => {
    const [result] = await db.query('INSERT INTO Permissao (nome) VALUES (?)', [nome]);
    return result.insertId;
  },

  assignToUser: async (utilizador_id, permissao_id) => {
    await db.query(
      'INSERT INTO Permissao_Utilizador (utilizador_id, permissao_id) VALUES (?, ?)',
      [utilizador_id, permissao_id]
    );
  },

  removeFromUser: async (utilizador_id, permissao_id) => {
    await db.query(
      'DELETE FROM Permissao_Utilizador WHERE utilizador_id = ? AND permissao_id = ?',
      [utilizador_id, permissao_id]
    );
  },

  getByUserId: async (userId) => {
    const [rows] = await db.query(`
      SELECT p.* FROM Permissao p
      JOIN Permissao_Utilizador pu ON p.id = pu.permissao_id
      WHERE pu.utilizador_id = ?
    `, [userId]);
    return rows;
  }
};

module.exports = Permission;
