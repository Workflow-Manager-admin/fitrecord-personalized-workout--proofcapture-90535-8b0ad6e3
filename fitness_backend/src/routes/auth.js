const express = require('express');
const authController = require('../controllers/auth');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Get profile (must be authenticated)
router.get('/profile', authenticateToken, authController.userProfile);

module.exports = router;
