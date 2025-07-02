const exerciseService = require('../services/exercise');

// PUBLIC_INTERFACE
/**
 * Suggest a personalized exercise routine (requires profile: weight & height).
 * Uses JWT for user context.
 */
async function suggestExercise(req, res) {
  // Improved debugging and input/log checking for troubleshooting
  if (!req.user) {
    // This means JWT middleware didn't attach user, likely an auth bug
    console.error('JWT user missing from req. Headers:', req.headers);
    return res.status(401).json({ message: 'Unauthorized - user not found in JWT.' });
  }
  const { weight, height } = req.body || {};
  // Log request for debugging
  console.log('/exercise/suggest called by user:', req.user, 'Payload:', req.body);

  // Type/geeky check: log types too
  console.debug('typeof weight:', typeof weight, 'typeof height:', typeof height);

  if (weight === undefined || height === undefined) {
    // Use loose check to catch 0 as valid input
    console.error('Missing weight or height in request body:', req.body);
    return res.status(400).json({ message: 'weight and height required' });
  }
  // Accept numbers or strings that parse to numbers, reject anything else
  const parsedWeight = typeof weight === 'string' || typeof weight === 'number' ? Number(weight) : NaN;
  const parsedHeight = typeof height === 'string' || typeof height === 'number' ? Number(height) : NaN;
  if (isNaN(parsedWeight) || isNaN(parsedHeight)) {
    console.error('Bad types for weight/height:', weight, height);
    return res.status(400).json({ message: 'weight and height must be numeric' });
  }
  if (parsedWeight <= 0 || parsedHeight <= 0) {
    console.error('Non-positive weight or height:', parsedWeight, parsedHeight);
    return res.status(400).json({ message: 'weight and height must be positive numbers' });
  }
  try {
    const info = exerciseService.suggestRoutine(parsedWeight, parsedHeight);
    console.log('suggestRoutine returned:', info);
    res.json(info);
  } catch (err) {
    // Log error for backend debugging
    console.error('Error in suggestRoutine:', err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = { suggestExercise };
