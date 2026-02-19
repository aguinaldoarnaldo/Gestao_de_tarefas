const Attachment = require('../models/Attachment');
const Task = require('../models/Task');
const path = require('path');
const fs = require('fs');

exports.uploadAttachment = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }

    const task = await Task.getById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    // Only creator of task can add attachments
    if (task.utilizador_id !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado. Somente o criador pode anexar arquivos.' });
    }

    const attachmentId = await Attachment.create({
      nome_arquivo: req.file.originalname,
      caminho_arquivo: req.file.path,
      tipo_arquivo: req.file.mimetype,
      tamanho_arquivo: req.file.size,
      tarefa_id: taskId
    });

    res.status(201).json({ message: 'Arquivo anexado com sucesso!', attachmentId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao anexar arquivo.' });
  }
};

exports.getTaskAttachments = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    const task = await Task.getById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    // Only owner can see attachments (according to strict rule, though usually viewing is allowed for members if it was a team system, but here "Somente o Utilizador criador pode gerenciar seus Anexos")
    if (task.utilizador_id !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    const attachments = await Attachment.getByTaskId(taskId);
    res.json(attachments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar anexos.' });
  }
};

exports.deleteAttachment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const attachment = await Attachment.getById(id);
    if (!attachment) {
      return res.status(404).json({ message: 'Anexo não encontrado.' });
    }

    const task = await Task.getById(attachment.tarefa_id);
    
    // Only creator can delete
    if (task.utilizador_id !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    // Delete file from disk
    if (fs.existsSync(attachment.caminho_arquivo)) {
      fs.unlinkSync(attachment.caminho_arquivo);
    }

    await Attachment.delete(id);
    res.json({ message: 'Anexo excluído com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir anexo.' });
  }
};

exports.downloadAttachment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const attachment = await Attachment.getById(id);
    if (!attachment) {
      return res.status(404).json({ message: 'Anexo não encontrado.' });
    }

    const task = await Task.getById(attachment.tarefa_id);
    if (task.utilizador_id !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    res.download(attachment.caminho_arquivo, attachment.nome_arquivo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao baixar arquivo.' });
  }
};
