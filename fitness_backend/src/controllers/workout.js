const workoutService = require('../services/workout');
const path = require('path');

// PUBLIC_INTERFACE
async function logWorkout(req, res) {
  /**
   * Log a workout session.
   * Body: { exercise }, file upload as 'proof' (optional)
   */
  try {
    const proofFilePath = req.file ? req.file.path : null;
    const session = await workoutService.logSession(req.user.userId, req.body.exercise, proofFilePath);
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// PUBLIC_INTERFACE
async function getHistory(req, res) {
  /** Returns workout history for auth user */
  try {
    const result = await workoutService.getHistory(req.user.userId, 30);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { logWorkout, getHistory };
