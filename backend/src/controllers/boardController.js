const Board = require('../models/Board');
const Task = require('../models/Task');

exports.createBoard = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const boardId = await Board.create({
      nome,
      descricao,
      criador_id: req.user.id
    });
    res.status(201).json({ message: 'Quadro criado com sucesso!', boardId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar quadro.' });
  }
};

exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.getAll(req.user.id);
    res.json(boards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar quadros.' });
  }
};

exports.getBoardMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const members = await Board.getMembers(id);
    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar membros do quadro.' });
  }
};

exports.addMemberToBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    await Board.addMember(id, userId);
    res.json({ message: 'Membro adicionado ao quadro!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar membro ao quadro.' });
  }
};

exports.removeMemberFromBoard = async (req, res) => {
  try {
    const { id, userId } = req.params;
    
    // Remove o membro do quadro
    await Board.removeMember(id, userId);
    
    // Remove o membro de todas as tarefas associadas a este quadro
    await Task.removeMemberFromBoardTasks(id, userId);
    
    res.json({ message: 'Membro removido do quadro e das tarefas associadas!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao remover membro do quadro.' });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    await Board.update(id, { nome, descricao });
    res.json({ message: 'Quadro atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar quadro.' });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;
    await Board.delete(id);
    res.json({ message: 'Quadro excluído com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir quadro.' });
  }
};
