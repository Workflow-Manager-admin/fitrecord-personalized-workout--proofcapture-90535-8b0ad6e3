const express = require('express');
const controller = require('../controllers/dbhealth');
const router = express.Router();

/**
 * @swagger
 * /db/health:
 *   get:
 *     summary: Health check for DB connectivity.
 *     tags: [Health]
 *     responses:
 *       200: { description: "DB healthy" }
 *       503: { description: "DB Unavailable" }
 */
router.get('/health', controller.dbHealthCheck);

module.exports = router;
