const exerciseService = require('../services/exercise');

// PUBLIC_INTERFACE
async function suggestExercise(req, res) {
  /** Suggest personalized routine for authenticated user. */
  const { weight, height } = req.body || {};
  if (weight == null || height == null) {
    return res.status(400).json({ message: 'weight and height required' });
  }
  const parsedWeight = Number(weight);
  const parsedHeight = Number(height);
  if (!Number.isFinite(parsedWeight) || !Number.isFinite(parsedHeight) || parsedWeight <= 0 || parsedHeight <= 0) {
    return res.status(400).json({ message: 'weight and height must be positive numbers' });
  }
  try {
    const info = exerciseService.suggestRoutine(parsedWeight, parsedHeight);
    res.json(info);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { suggestExercise };
