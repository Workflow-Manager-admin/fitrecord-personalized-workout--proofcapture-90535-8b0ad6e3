const { WorkoutSession } = require('../models');

// PUBLIC_INTERFACE
class WorkoutService {
  async logSession(userId, exercise, proofFilePath = null) {
    /** Log a workout for a user, file path optional. */
    if (!exercise) throw new Error('Exercise is required');
    const session = await WorkoutSession.create({
      userId, exercise, proofFile: proofFilePath
    });
    return session;
  }

  async getHistory(userId, limit = 30) {
    /** Up to 'limit' most recent sessions for user */
    return WorkoutSession.findAll({
      where: { userId },
      order: [['date', 'DESC']],
      limit,
      attributes: ['id', 'date', 'exercise', 'proofFile']
    });
  }
}
module.exports = new WorkoutService();
