const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Apply authentication middleware to all routes in this router
router.use(authMiddleware);

// Route accessible by all authenticated users
router.get('/me', userController.getMe);

// Route accessible only by users with specific roles (admin or agent)
router.get('/', roleMiddleware(['admin', 'agent']), userController.getAllUsers);

module.exports = router;