const express = require('express');
const router = express.Router();
const attachmentController = require('../controllers/attachmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/multer');

// All routes require authentication
router.use(authMiddleware);

router.post('/task/:taskId', upload.single('file'), attachmentController.uploadAttachment);
router.get('/task/:taskId', attachmentController.getTaskAttachments);
router.get('/:id/download', attachmentController.downloadAttachment);
router.delete('/:id', attachmentController.deleteAttachment);

module.exports = router;
