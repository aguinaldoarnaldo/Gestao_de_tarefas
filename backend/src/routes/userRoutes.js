const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');

// Public routes (though usually /api/auth is used)
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.put('/change-password', authMiddleware, userController.changePassword);
router.get('/stats', authMiddleware, userController.getUserStats);

// Admin only routes
router.get('/', authMiddleware, isAdmin, userController.getAllUsers);
router.post('/', authMiddleware, isAdmin, authController.register);
router.put('/:id', authMiddleware, isAdmin, userController.updateUser);
router.delete('/:id', authMiddleware, isAdmin, userController.deleteUser);

module.exports = router;
