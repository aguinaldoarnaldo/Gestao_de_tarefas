const express = require('express');
const router = express.Router();
const teamInviteController = require('../controllers/teamInviteController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/send', authMiddleware, teamInviteController.sendInvite);
router.get('/my', authMiddleware, teamInviteController.getMyInvites);
router.post('/respond', authMiddleware, teamInviteController.respondToInvite);

module.exports = router;
