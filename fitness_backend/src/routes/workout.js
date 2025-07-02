const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const workoutController = require('../controllers/workout');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${unique}-${file.originalname}`);
  }
});
const upload = multer({ storage });

/**
 * @swagger
 * /workout/log:
 *   post:
 *     summary: Log a workout session; can upload proof.
 *     tags: [Workout]
 *     consumes:
 *       - multipart/form-data
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               exercise: { type: string }
 *               proof: { type: string, format: binary }
 *     responses:
 *       201: { description: "Session recorded" }
 *       400: { description: "Bad request" }
 */
router.post('/log', authenticateToken, upload.single('proof'), workoutController.logWorkout);

/**
 * @swagger
 * /workout/history:
 *   get:
 *     summary: Get workout session history.
 *     tags: [Workout]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: "List of workouts" }
 */
router.get('/history', authenticateToken, workoutController.getHistory);

module.exports = router;
