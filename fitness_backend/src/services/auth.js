//
// User auth services for registration, login, JWT issuing
//
const { User, Profile } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'myultrasecret';

class AuthService {
  // PUBLIC_INTERFACE
  async register({ username, password, weight, height }) {
    /** Register user and set initial profile. */
    if (!username || !password || !weight || !height) {
      throw new Error('All fields required');
    }
    const exists = await User.findOne({ where: { username } });
    if (exists) throw new Error('Username already exists');
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });
    await Profile.create({ userId: user.id, weight, height });
    return { userId: user.id, username: user.username };
  }

  // PUBLIC_INTERFACE
  async login({ username, password }) {
    /** Issue JWT if username/password correct. */
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error('Incorrect credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Incorrect credentials');
    // fetch profile for personalized info
    const profile = await Profile.findOne({ where: { userId: user.id } });
    const token = jwt.sign({ userId: user.id, username }, JWT_SECRET, { expiresIn: '12h' });
    return {
      token,
      user: { userId: user.id, username, weight: profile?.weight, height: profile?.height }
    };
  }

  // PUBLIC_INTERFACE
  async getUserProfile(userId) {
    /** Returns profile for userId (excluding password) */
    const user = await User.findByPk(userId, {
      include: [{ model: Profile }]
    });
    if (!user) throw new Error('User not found');
    return {
      userId: user.id,
      username: user.username,
      weight: user.Profile?.weight,
      height: user.Profile?.height,
    };
  }
}

module.exports = new AuthService();
