const { sequelize } = require('../models');

// PUBLIC_INTERFACE
async function dbHealthCheck(req, res) {
  /** Database health check for DB connectivity, write & read accessibility. */
  try {
    await sequelize.authenticate();
    await sequelize.query('SELECT 1');
    // Write/read test on temp table
    await sequelize.query('CREATE TEMP TABLE IF NOT EXISTS tmp_healthcheck(val INTEGER);');
    await sequelize.query('DELETE FROM tmp_healthcheck;');
    await sequelize.query('INSERT INTO tmp_healthcheck(val) VALUES (42);');
    const [rows] = await sequelize.query('SELECT val FROM tmp_healthcheck LIMIT 1;');
    if (!rows.length || rows[0].val !== 42) {
      throw new Error('DB writable check failed');
    }
    res.status(200).json({ status: 'ok', message: 'DB is healthy', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(503).json({ status: 'fail', message: err.message });
  }
}
module.exports = { dbHealthCheck };
