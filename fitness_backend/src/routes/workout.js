const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const workoutController = require('../controllers/workout');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Ensure uploads dir exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// POST /workout/log (with optional proof upload)
router.post('/log', authenticateToken, upload.single('proof'), workoutController.logWorkout);

// GET /workout/history
router.get('/history', authenticateToken, workoutController.getHistory);

module.exports = router;
