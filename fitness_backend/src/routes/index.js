const express = require('express');
const healthController = require('../controllers/health');
const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const exerciseRoutes = require('./exercise');
const workoutRoutes = require('./workout');
const dbhealthRoutes = require('./dbhealth');

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

// Other routers
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/exercise', exerciseRoutes);
router.use('/workout', workoutRoutes);
router.use('/db', dbhealthRoutes);

module.exports = router;
