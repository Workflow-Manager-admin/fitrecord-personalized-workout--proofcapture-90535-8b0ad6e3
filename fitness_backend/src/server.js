require('dotenv').config();

const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// PUBLIC_INTERFACE
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    await sequelize.sync();
    console.log('DB synchronized');
    const server = app.listen(PORT, HOST, () =>
      console.log(`Fitness backend running at http://${HOST}:${PORT}`)
    );

    process.on('SIGTERM', () => {
      console.log('SIGTERM: closing HTTP server');
      server.close(() => {
        process.exit(0);
      });
    });
  } catch (err) {
    console.error('Startup DB error:', err);
    process.exit(1);
  }
}

startServer();

module.exports = app;
