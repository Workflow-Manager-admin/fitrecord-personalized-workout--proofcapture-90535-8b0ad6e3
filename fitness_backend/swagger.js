const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fitness App Backend API',
      version: '1.0.0',
      description: 'API for managing users, fitness routines, workout proofs, history, and health checks.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: [
    './src/routes/*.js',
    './src/routes/auth.js',
    './src/routes/profile.js',
    './src/routes/exercise.js',
    './src/routes/workout.js',
    './src/routes/dbhealth.js'
  ],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
