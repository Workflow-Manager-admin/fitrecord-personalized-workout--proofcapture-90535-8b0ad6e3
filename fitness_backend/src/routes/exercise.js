const express = require('express');
const exerciseController = require('../controllers/exercise');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// POST /exercise/suggest
router.post('/suggest', authenticateToken, exerciseController.suggestExercise);

module.exports = router;
