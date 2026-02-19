const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); // All task routes require authentication

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/my-tasks', taskController.getUserTasks);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
