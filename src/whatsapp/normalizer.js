/**
 * WhatsApp Message Normalizer
 * Converts WhatsApp webhook payloads to canonical format
 */

const logger = require('../utils/logger');

/**
 * @typedef {Object} NormalizedMessage
 * @property {string} userId - WhatsApp phone number
 * @property {string} messageId - WhatsApp message ID
 * @property {'text'|'button'|'list'|'unknown'} type - Message type
 * @property {string} [text] - Text content (for text messages)
 * @property {string} [buttonId] - Button ID (for button replies)
 * @property {string} [buttonText] - Button text (for button replies)
 * @property {string} [listId] - List row ID (for list selections)
 * @property {string} [listTitle] - List row title (for list selections)
 * @property {number} timestamp - Message timestamp
 */

/**
 * Normalize WhatsApp webhook message to internal format
 * @param {Object} webhookBody - WhatsApp webhook payload
 * @returns {NormalizedMessage|null}
 */
function normalizeMessage(webhookBody) {
  try {
    // Extract the message from webhook structure
    const entry = webhookBody?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    
    if (!value?.messages?.[0]) {
      logger.debug('No message in webhook payload');
      return null;
    }
    
    const message = value.messages[0];
    const contact = value.contacts?.[0];
    
    const base = {
      userId: message.from,
      messageId: message.id,
      timestamp: parseInt(message.timestamp, 10) * 1000,
      userName: contact?.profile?.name || null
    };
    
    // Handle different message types
    switch (message.type) {
      case 'text':
        return {
          ...base,
          type: 'text',
          text: message.text?.body || ''
        };
        
      case 'interactive':
        return normalizeInteractive(base, message.interactive);
        
      case 'button':
        // Quick reply button
        return {
          ...base,
          type: 'button',
          buttonId: message.button?.payload,
          buttonText: message.button?.text
        };
        
      default:
        logger.warn(`Unknown message type: ${message.type}`);
        return {
          ...base,
          type: 'unknown',
          raw: message
        };
    }
  } catch (error) {
    logger.error('Error normalizing message', { error: error.message });
    return null;
  }
}

/**
 * Normalize interactive message (buttons or list)
 * @param {Object} base - Base message properties
 * @param {Object} interactive - Interactive object from WhatsApp
 * @returns {NormalizedMessage}
 */
function normalizeInteractive(base, interactive) {
  if (!interactive) {
    return { ...base, type: 'unknown' };
  }
  
  switch (interactive.type) {
    case 'button_reply':
      return {
        ...base,
        type: 'button',
        buttonId: interactive.button_reply?.id,
        buttonText: interactive.button_reply?.title
      };
      
    case 'list_reply':
      return {
        ...base,
        type: 'list',
        listId: interactive.list_reply?.id,
        listTitle: interactive.list_reply?.title,
        listDescription: interactive.list_reply?.description
      };
      
    default:
      return { ...base, type: 'unknown' };
  }
}

/**
 * Check if webhook is a status update (not a message)
 * @param {Object} webhookBody
 * @returns {boolean}
 */
function isStatusUpdate(webhookBody) {
  const value = webhookBody?.entry?.[0]?.changes?.[0]?.value;
  return value?.statuses && !value?.messages;
}

module.exports = {
  normalizeMessage,
  isStatusUpdate
};
