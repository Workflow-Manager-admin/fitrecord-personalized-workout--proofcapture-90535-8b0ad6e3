const { WorkoutSession } = require('../models');
const path = require('path');

class WorkoutService {
  // PUBLIC_INTERFACE
  async logSession(userId, exercise, proofFilePath = null) {
    /** Log a workout for a user, optionally storing proof file path. */
    const session = await WorkoutSession.create({
      userId,
      exercise,
      proofFile: proofFilePath || null
    });
    return session;
  }

  // PUBLIC_INTERFACE
  async getHistory(userId, limit = 20) {
    /** Get workout history (most recent first). */
    return WorkoutSession.findAll({
      where: { userId },
      order: [['date', 'DESC']],
      limit,
      attributes: ['id', 'date', 'exercise', 'proofFile']
    });
  }
}

module.exports = new WorkoutService();
