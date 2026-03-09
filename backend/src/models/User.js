const db = require('../config/database');

const User = {
  create: async (userData) => {
    const { nome, email, senha } = userData;
    const [result] = await db.query(
      'INSERT INTO utilizador (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senha]
    );
    return result.insertId;
  },

  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM utilizador WHERE email = ?', [email]);
    return rows[0];
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT id, nome, email FROM utilizador WHERE id = ?', [id]);
    return rows[0];
  },

  findByIdWithPassword: async (id) => {
    const [rows] = await db.query('SELECT * FROM utilizador WHERE id = ?', [id]);
    return rows[0];
  },

  getAll: async () => {
    const [rows] = await db.query('SELECT id, nome, email FROM utilizador');
    return rows;
  },

  searchByNome: async (nome) => {
    const [rows] = await db.query(
      'SELECT id, nome, email FROM utilizador WHERE nome LIKE ?',
      [`%${nome}%`]
    );
    return rows;
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
