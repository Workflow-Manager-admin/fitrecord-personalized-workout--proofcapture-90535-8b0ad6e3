const cors = require('cors');
const path = require('path');
const express = require('express');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');

// Initialize express app
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Swagger docs UI with dynamic server setting
app.use('/docs', swaggerUi.serve, (req, res, next) => {
  const dynamicSpec = {
    ...swaggerSpec,
    servers: [
      {
        url: `${req.protocol}://${req.get('host')}`,
      },
    ],
  };
  swaggerUi.setup(dynamicSpec)(req, res, next);
});

// Parse incoming JSON request bodies
app.use(express.json());

// Parse form-data for file uploads in /workout/log - will be handled per-route with multer
// (not using express.urlencoded globally due to API requirements)

// Core API Routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  console.error('Server error:', err);
  res.status(500).json({
    message: 'Internal Server Error'
  });
});

module.exports = app;

