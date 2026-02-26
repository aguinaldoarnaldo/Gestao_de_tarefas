const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', teamController.createTeam);
router.get('/', teamController.getAllTeams);
router.get('/:id/members', teamController.getTeamMembers);
router.post('/:id/members', teamController.addMemberToTeam);
router.delete('/:id/members/:userId', teamController.removeMemberFromTeam);
router.delete('/:id', teamController.deleteTeam);

module.exports = router;
