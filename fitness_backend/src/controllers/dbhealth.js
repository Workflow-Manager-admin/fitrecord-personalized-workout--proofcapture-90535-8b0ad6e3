const { sequelize } = require('../models');

// PUBLIC_INTERFACE
async function dbHealthCheck(req, res) {
  /**
   * Checks DB connection and basic query on SQLite.
   * GET /db/health
   */
  try {
    await sequelize.authenticate();
    await sequelize.query('SELECT 1');
    res.status(200).json({ status: 'ok', message: 'DB is healthy', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(503).json({ status: 'fail', message: err.message });
  }
}
module.exports = { dbHealthCheck };
