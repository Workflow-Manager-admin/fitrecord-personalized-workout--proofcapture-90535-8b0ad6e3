// Service for updating user profile (weight, height)
const { Profile } = require('../models');

class ProfileService {
  // PUBLIC_INTERFACE
  async updateProfile(userId, { weight, height }) {
    /** Update the weight and/or height fields for a user profile. */
    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) throw new Error('Profile not found');
    if (weight) profile.weight = weight;
    if (height) profile.height = height;
    await profile.save();
    return { weight: profile.weight, height: profile.height };
  }
}

module.exports = new ProfileService();
