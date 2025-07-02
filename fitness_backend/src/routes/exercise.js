const express = require('express');
const exerciseController = require('../controllers/exercise');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /exercise/suggest:
 *   post:
 *     summary: Get personalized exercise suggestion.
 *     tags: [Exercise]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [weight, height]
 *             properties:
 *               weight: { type: number }
 *               height: { type: number }
 *     responses:
 *       200: { description: "Exercise suggestion" }
 *       400: { description: "Missing data" }
 */
router.post('/suggest', authenticateToken, exerciseController.suggestExercise);

module.exports = router;
