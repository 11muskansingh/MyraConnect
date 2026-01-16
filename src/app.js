/**
 * Myra WhatsApp Bot
 * Main Express application entry point
 */

const express = require('express');
const config = require('./config');
const logger = require('./utils/logger');
const webhookRoutes = require('./routes/webhook');
const myraClient = require('./myra/wsClient');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  if (req.path === '/test/message') {
    logger.info(`📥 ${req.method} ${req.path}`, {
      query: Object.keys(req.query).length > 0 ? req.query : undefined,
      body: req.body && Object.keys(req.body).length > 0 ? req.body : undefined
    });
  } else {
    logger.debug(`${req.method} ${req.path}`, {
      query: Object.keys(req.query).length > 0 ? req.query : undefined,
      body: req.body && Object.keys(req.body).length > 0 ? '(body present)' : undefined
    });
  }
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    myraConnected: myraClient.isConnected
  });
});

// Mount routes
app.use('/', webhookRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
async function start() {
  try {
    // Check WhatsApp configuration
    if (!config.whatsapp.accessToken) {
      logger.warn('⚠️ WA_ACCESS_TOKEN not set - WhatsApp messages will not work');
      logger.warn('   Set WA_ACCESS_TOKEN in your .env file to enable WhatsApp messaging');
    } else if (config.whatsapp.accessToken.length < 50) {
      logger.warn('⚠️ WA_ACCESS_TOKEN appears to be invalid (too short)');
    } else {
      logger.info('✅ WhatsApp access token configured');
    }

    if (!config.whatsapp.phoneNumberId) {
      logger.warn('⚠️ WA_PHONE_NUMBER_ID not set - WhatsApp messages will not work');
    } else {
      logger.info('✅ WhatsApp phone number ID configured');
    }

    // Connect to Myra WebSocket
    logger.info('Connecting to Myra AI...');
    await myraClient.connect();
    
    // Start Express server
    app.listen(config.port, () => {
      logger.info(`🚀 Server running on port ${config.port}`);
      logger.info(`📱 Webhook URL: http://localhost:${config.port}/webhook`);
      logger.info(`🧪 Test URL: http://localhost:${config.port}/test/message`);
      logger.info(`💚 Health: http://localhost:${config.port}/health`);
      
      if (!config.whatsapp.accessToken || !config.whatsapp.phoneNumberId) {
        logger.warn('⚠️ WhatsApp not fully configured - messages will fail');
        logger.warn('   Configure WA_ACCESS_TOKEN and WA_PHONE_NUMBER_ID in .env');
      }
    });
    
  } catch (error) {
    logger.error('Failed to start server', { error: error.message });
    
    // Start server anyway (can work without Myra in test mode)
    app.listen(config.port, () => {
      logger.warn(`⚠️ Server running on port ${config.port} (Myra not connected)`);
    });
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down...');
  myraClient.disconnect();
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down...');
  myraClient.disconnect();
  process.exit(0);
});

// Start the application
start();

module.exports = app;
