const express = require('express');
const profileController = require('../controllers/profile');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update weight and height.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weight: { type: number }
 *               height: { type: number }
 *     responses:
 *       200: { description: "Profile updated" }
 *       400: { description: "Error" }
 */
router.put('/', authenticateToken, profileController.updateProfile);

module.exports = router;
