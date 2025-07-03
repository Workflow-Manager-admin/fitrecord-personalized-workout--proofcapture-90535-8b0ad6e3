const express = require('express');
const profileController = require('../controllers/profile');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// PUT /profile (update weight/height)
router.put('/', authenticateToken, profileController.updateProfile);

module.exports = router;
