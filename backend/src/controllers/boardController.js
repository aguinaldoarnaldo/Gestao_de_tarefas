const Board = require('../models/Board');
const Task = require('../models/Task');

exports.createBoard = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const foto_fundo = req.file ? `uploads/${req.file.filename}` : null;
    
    const boardId = await Board.create({
      nome,
      descricao,
      criador_id: req.user.id,
      foto_fundo
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

exports.getBoardById = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await Board.getById(id);
    
    if (!board) {
      return res.status(404).json({ message: 'Quadro não encontrado.' });
    }

    // Check if user has permission
    if (Number(board.utilizador_id) !== Number(req.user.id)) {
      return res.status(403).json({ message: 'Acesso negado a este quadro.' });
    }

    res.json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar detalhes do quadro.' });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    const userId = req.user.id;

    const board = await Board.getById(id);
    if (!board) return res.status(404).json({ message: 'Quadro não encontrado.' });

    if (Number(board.utilizador_id) !== Number(userId)) {
      return res.status(403).json({ message: 'Ação não permitida. Apenas o criador do quadro pode editá-lo.' });
    }

    const foto_fundo = req.file ? `uploads/${req.file.filename}` : board.foto_fundo;

    await Board.update(id, { nome, descricao, foto_fundo });
    res.json({ message: 'Quadro atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar quadro.' });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const board = await Board.getById(id);
    if (!board) return res.status(404).json({ message: 'Quadro não encontrado.' });

    if (Number(board.utilizador_id) !== Number(userId)) {
      return res.status(403).json({ message: 'Ação não permitida. Apenas o criador do quadro pode excluí-lo.' });
    }

    await Board.delete(id);
    res.json({ message: 'Quadro excluído com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir quadro.' });
  }
};
