const authService = require('../services/auth');

// PUBLIC_INTERFACE
async function register(req, res) {
  /** Register a new user and profile. */
  try {
    const obj = await authService.register(req.body);
    res.status(201).json({ ...obj, message: 'Registration successful' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// PUBLIC_INTERFACE
async function login(req, res) {
  /** Authenticate user and return JWT. */
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}

// PUBLIC_INTERFACE
async function userProfile(req, res) {
  /** Get profile for authenticated user (JWT). */
  try {
    const profile = await authService.getUserProfile(req.user.userId);
    res.json(profile);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

module.exports = {
  register, login, userProfile
};
