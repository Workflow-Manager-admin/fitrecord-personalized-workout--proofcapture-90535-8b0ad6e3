const healthService = require('../services/health');

// PUBLIC_INTERFACE
function check(req, res) {
  /** Application health endpoint root (`/`). */
  const healthStatus = healthService.getStatus();
  res.status(200).json(healthStatus);
}

module.exports = { check };
