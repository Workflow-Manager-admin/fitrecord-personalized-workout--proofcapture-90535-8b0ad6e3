const express = require('express');
const authController = require('../controllers/auth');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user and profile.
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password, weight, height]
 *             properties:
 *               username: { type: string }
 *               password: { type: string }
 *               weight: { type: number }
 *               height: { type: number }
 *     responses:
 *       201: { description: "Registration successful" }
 *       400: { description: "Validation error" }
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in & get JWT.
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: "JWT issued" }
 *       401: { description: "Bad credentials" }
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile by JWT.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: "User profile" }
 *       401: { description: "Invalid token" }
 */
router.get('/profile', authenticateToken, authController.userProfile);

module.exports = router;
