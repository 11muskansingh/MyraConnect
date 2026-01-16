/**
 * WhatsApp Webhook Handler
 * Handles webhook verification and incoming messages
 */

const config = require('../config');
const logger = require('../utils/logger');
const { normalizeMessage, isStatusUpdate } = require('./normalizer');
const orchestrator = require('../logic/orchestrator');

/**
 * Handle webhook verification (GET request)
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
function handleVerification(req, res) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  logger.info('Webhook verification request', { mode, hasToken: !!token });

  if (mode === 'subscribe' && token === config.whatsapp.verifyToken) {
    logger.info('Webhook verified successfully');
    return res.status(200).send(challenge);
  }

  logger.warn('Webhook verification failed');
  return res.sendStatus(403);
}

/**
 * Handle incoming webhook events (POST request)
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
async function handleIncoming(req, res) {
  try {
    const body = req.body;

    // Log incoming webhook
    logger.debug('Incoming webhook', { 
      object: body.object,
      hasEntry: !!body.entry
    });

    // Verify it's a WhatsApp webhook
    if (body.object !== 'whatsapp_business_account') {
      return res.sendStatus(404);
    }

    // Acknowledge receipt immediately (WhatsApp expects quick response)
    res.sendStatus(200);

    // Check if it's just a status update
    if (isStatusUpdate(body)) {
      logger.debug('Status update received, ignoring');
      return;
    }

    // Normalize the message
    const normalizedMessage = normalizeMessage(body);
    
    if (!normalizedMessage) {
      logger.debug('Could not normalize message');
      return;
    }

    logger.info('Message received', {
      userId: normalizedMessage.userId,
      type: normalizedMessage.type,
      text: normalizedMessage.text?.slice(0, 50)
    });

    // Process message through orchestrator
    await orchestrator.processMessage(normalizedMessage);

  } catch (error) {
    logger.error('Error handling webhook', { error: error.message, stack: error.stack });
    // Don't send error response as we already sent 200
  }
}

module.exports = {
  handleVerification,
  handleIncoming
};
