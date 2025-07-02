const exerciseService = require('../services/exercise');

// PUBLIC_INTERFACE
async function suggestExercise(req, res) {
  /**
   * Suggest a personalized exercise routine (requires profile: weight & height).
   * Uses JWT for user context.
   */
  try {
    const { weight, height } = req.body;
    if (!weight || !height) {
      return res.status(400).json({ message: 'weight and height required' });
    }
    const info = exerciseService.suggestRoutine(weight, height);
    res.json(info);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { suggestExercise };
