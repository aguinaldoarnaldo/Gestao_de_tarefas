const db = require('../config/database');

const User = {
  create: async (userData) => {
    const { nome, email, senha, tipo } = userData;
    const [result] = await db.query(
      'INSERT INTO utilizador (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
      [nome, email, senha, tipo]
    );
    return result.insertId;
  },

  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM utilizador WHERE email = ?', [email]);
    return rows[0];
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT id, nome, email, tipo FROM utilizador WHERE id = ?', [id]);
    return rows[0];
  },

  findByIdWithPassword: async (id) => {
    const [rows] = await db.query('SELECT * FROM utilizador WHERE id = ?', [id]);
    return rows[0];
  },

  getAll: async () => {
    const [rows] = await db.query('SELECT id, nome, email, tipo FROM utilizador');
    return rows;
  },

  searchByNome: async (nome) => {
    const [rows] = await db.query(
      'SELECT id, nome, email, tipo FROM utilizador WHERE nome LIKE ?',
      [`%${nome}%`]
    );
    return rows;
  },

  getPermissions: async (userId) => {
    const [rows] = await db.query(`
      SELECT p.nome 
      FROM permissao p
      JOIN permissao_utilizador pu ON p.id = pu.permissao_id
      WHERE pu.utilizador_id = ?
    `, [userId]);
    return rows.map(row => row.nome);
  },

  update: async (id, userData) => {
    const fields = [];
    const values = [];
    
    if (userData.nome !== undefined) {
      fields.push('nome = ?');
      values.push(userData.nome);
    }
    if (userData.email !== undefined) {
      fields.push('email = ?');
      values.push(userData.email);
    }
    if (userData.senha !== undefined) {
      fields.push('senha = ?');
      values.push(userData.senha);
    }
    if (userData.tipo !== undefined) {
      fields.push('tipo = ?');
      values.push(userData.tipo);
    }
    
    values.push(id);
    
    await db.query(
      `UPDATE utilizador SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
  },

  delete: async (id) => {
    await db.query('DELETE FROM utilizador WHERE id = ?', [id]);
  }
};

module.exports = User;
