const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', boardController.createBoard);
router.get('/', boardController.getAllBoards);
router.put('/:id', boardController.updateBoard);
router.delete('/:id', boardController.deleteBoard);

// Board members management
router.get('/:id/members', boardController.getBoardMembers);
router.post('/:id/members', boardController.addMemberToBoard);
router.delete('/:id/members/:userId', boardController.removeMemberFromBoard);

module.exports = router;
