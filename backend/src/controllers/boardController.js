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

    const newBoard = await Board.getById(boardId);
    const io = req.app.get('io');
    if (io) {
      io.emit('boards_list_changed', { type: 'create', board: newBoard });
    }

    res.status(201).json({ message: 'Quadro criado com sucesso!', boardId, board: newBoard });
  } catch (error) {
    console.error('Create Board Error:', error);
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

    let foto_fundo = board.foto_fundo;
    if (req.file) {
      foto_fundo = `uploads/${req.file.filename}`;
    } else if (board.foto_fundo && board.foto_fundo.includes('http')) {
      // If it accidentally became a full URL, strip it back to relative
      foto_fundo = board.foto_fundo.split('/uploads/')[1] ? `uploads/${board.foto_fundo.split('/uploads/')[1]}` : board.foto_fundo;
    }

    await Board.update(id, { nome, descricao, foto_fundo });
    
    // Get the updated board to return it
    const updatedBoard = await Board.getById(id);

    // Notify via Socket.io
    const io = req.app.get('io');
    if (io) {
      // Notify everyone in the board room
      io.to(`board_${id}`).emit('board_updated', updatedBoard);
      // Also notify generally that a board changed (for the boards list)
      io.emit('boards_list_changed', { type: 'update', boardId: id });
    }

    res.json({ 
      message: 'Quadro atualizado com sucesso!', 
      board: updatedBoard 
    });
  } catch (error) {
    console.error('Update Board Error:', error);
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

    const io = req.app.get('io');
    if (io) {
      io.to(`board_${id}`).emit('board_deleted', { id });
      io.emit('boards_list_changed', { type: 'delete', boardId: id });
    }

    res.json({ message: 'Quadro excluído com sucesso!' });
  } catch (error) {
    console.error('Delete Board Error:', error);
    res.status(500).json({ message: 'Erro ao excluir quadro.' });
  }
};
