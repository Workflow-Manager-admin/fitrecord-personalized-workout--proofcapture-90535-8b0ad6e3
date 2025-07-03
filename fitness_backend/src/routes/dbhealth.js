const express = require('express');
const controller = require('../controllers/dbhealth');
const router = express.Router();

router.get('/health', controller.dbHealthCheck);

module.exports = router;
