const profileService = require('../services/profile');

// PUBLIC_INTERFACE
async function updateProfile(req, res) {
  /**
   * Update user's weight/height.
   * Request: { weight, height }
   * Needs Authorization header.
   */
  try {
    const result = await profileService.updateProfile(req.user.userId, req.body);
    res.json({ ...result, message: 'Profile updated' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { updateProfile };
