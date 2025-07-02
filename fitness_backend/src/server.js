require('dotenv').config(); // Load environment variables from .env

const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

async function startServer() {
  try {
    // Always test DB authentication first.
    await sequelize.authenticate();
    console.log('Database connection established');

    // Then sync models
    await sequelize.sync();
    console.log('Database synchronized');

    const server = app.listen(PORT, HOST, () => {
      console.log(`Server running at http://${HOST}:${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
