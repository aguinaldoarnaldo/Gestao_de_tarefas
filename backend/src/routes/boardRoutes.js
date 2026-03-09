const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/multer');

router.use(authMiddleware);

// Basic board operations
router.post('/', upload.single('foto_fundo'), boardController.createBoard);
router.get('/', boardController.getAllBoards);
router.get('/:id', boardController.getBoardById);
router.put('/:id', upload.single('foto_fundo'), boardController.updateBoard);
router.delete('/:id', boardController.deleteBoard);

module.exports = router;
