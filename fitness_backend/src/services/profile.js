// Service to update weight/height for a user
const { Profile } = require('../models');

class ProfileService {
  // PUBLIC_INTERFACE
  async updateProfile(userId, { weight, height }) {
    /** Update weight and/or height for existing profile. */
    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) throw new Error('Profile not found');
    if (weight != null) profile.weight = weight;
    if (height != null) profile.height = height;
    await profile.save();
    return { weight: profile.weight, height: profile.height };
  }
}

module.exports = new ProfileService();
