const db = require('../config/database');

const Attachment = {
  create: async (attachmentData) => {
    const { nome_arquivo, caminho_arquivo, tipo_arquivo, tamanho_arquivo, tarefa_id } = attachmentData;
    const [result] = await db.query(
      'INSERT INTO anexo (nome_arquivo, caminho_arquivo, tipo_arquivo, tamanho_arquivo, tarefa_id) VALUES (?, ?, ?, ?, ?)',
      [nome_arquivo, caminho_arquivo, tipo_arquivo, tamanho_arquivo, tarefa_id]
    );
    return result.insertId;
  },

  getByTaskId: async (taskId) => {
    const [rows] = await db.query('SELECT * FROM anexo WHERE tarefa_id = ?', [taskId]);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM anexo WHERE id = ?', [id]);
    return rows[0];
  },

  delete: async (id) => {
    await db.query('DELETE FROM anexo WHERE id = ?', [id]);
  },

  deleteByTaskId: async (taskId) => {
    await db.query('DELETE FROM anexo WHERE tarefa_id = ?', [taskId]);
  }
};

module.exports = Attachment;
