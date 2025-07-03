const express = require('express');
const healthController = require('../controllers/health');
const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const exerciseRoutes = require('./exercise');
const workoutRoutes = require('./workout');
const dbhealthRoutes = require('./dbhealth');

const router = express.Router();

// Health root
router.get('/', healthController.check);

// API modules
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/exercise', exerciseRoutes);
router.use('/workout', workoutRoutes);
router.use('/db', dbhealthRoutes);

module.exports = router;
