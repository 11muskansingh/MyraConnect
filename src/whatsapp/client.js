/**
 * WhatsApp Business API Client
 * Sends messages to WhatsApp Cloud API
 */

const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');
const { normalizePhoneNumber, formatPhoneNumber } = require('../utils/phoneNumber');

class WhatsAppClient {
  constructor() {
    this.baseUrl = `${config.whatsapp.apiUrl}/${config.whatsapp.phoneNumberId}/messages`;
    this.headers = {
      'Authorization': `Bearer ${config.whatsapp.accessToken}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Normalize phone number in payload
   * @param {Object} payload - WhatsApp message payload
   * @returns {Object} - Payload with normalized phone number
   */
  _normalizePayload(payload) {
    if (payload.to) {
      const originalTo = payload.to;
      const normalizedTo = normalizePhoneNumber(payload.to);
      
      if (originalTo !== normalizedTo) {
        logger.debug('Normalizing phone number', {
          original: originalTo,
          normalized: normalizedTo
        });
      }
      
      return {
        ...payload,
        to: normalizedTo
      };
    }
    return payload;
  }

  /**
   * Check if error is due to recipient not in allowed list
   * @param {Object} error - Axios error
   * @returns {boolean}
   */
  _isRecipientNotAllowedError(error) {
    const errorCode = error.response?.data?.error?.code;
    const errorMessage = error.response?.data?.error?.message || '';
    return errorCode === 131030 || errorMessage.includes('Recipient phone number not in allowed list');
  }

  /**
   * Check if error is due to expired or invalid access token
   * @param {Object} error - Axios error
   * @returns {boolean}
   */
  _isTokenError(error) {
    const errorCode = error.response?.data?.error?.code;
    const errorMessage = error.response?.data?.error?.message || '';
    const errorType = error.response?.data?.error?.type || '';
    
    // Error code 190 = OAuthException (token issues)
    // Error code 401 = Unauthorized (usually token issues)
    return errorCode === 190 || 
           errorCode === 401 || 
           errorType === 'OAuthException' ||
           errorMessage.includes('access token') ||
           errorMessage.includes('Session has expired') ||
           errorMessage.includes('Token expired');
  }

  /**
   * Send a message to WhatsApp
   * @param {Object} payload - WhatsApp message payload
   * @returns {Promise<Object>}
   */
  async send(payload) {
    // Normalize phone number
    const normalizedPayload = this._normalizePayload(payload);
    const phoneNumberDisplay = formatPhoneNumber(normalizedPayload.to);

    // Test mode: Skip actual API call in development
    if (config.isDev && !config.whatsapp.accessToken) {
      logger.info('🧪 TEST MODE: Skipping WhatsApp API call', {
        to: phoneNumberDisplay,
        normalized: normalizedPayload.to,
        type: normalizedPayload.type,
        message: normalizedPayload.text?.body || normalizedPayload.interactive?.body?.text || 'N/A'
      });
      return {
        messaging_product: 'whatsapp',
        contacts: [{ input: normalizedPayload.to, wa_id: normalizedPayload.to }],
        messages: [{ id: `test_${Date.now()}` }]
      };
    }

    try {
      logger.debug('Sending WhatsApp message', {
        to: phoneNumberDisplay,
        normalized: normalizedPayload.to,
        type: normalizedPayload.type
      });

      const response = await axios.post(this.baseUrl, normalizedPayload, {
        headers: this.headers
      });
      
      logger.debug('Message sent successfully', { 
        messageId: response.data?.messages?.[0]?.id,
        to: phoneNumberDisplay
      });
      return response.data;
    } catch (error) {
      const errorData = error.response?.data?.error || {};
      const errorCode = errorData.code;
      const errorMessage = errorData.message || error.message;
      const errorType = errorData.type || '';

      // Special handling for token errors (expired/invalid)
      if (this._isTokenError(error)) {
        logger.error('❌ WhatsApp Access Token Error', {
          errorCode,
          errorType,
          errorMessage,
          help: 'Your WhatsApp access token has expired or is invalid. Generate a new token from WhatsApp Business Manager and update WA_ACCESS_TOKEN in your .env file.'
        });
        
        // Create a custom error with more context
        const customError = new Error(`WhatsApp access token expired or invalid. Error: ${errorMessage}. Please generate a new token from WhatsApp Business Manager.`);
        customError.code = errorCode || 190;
        customError.isTokenError = true;
        customError.originalMessage = errorMessage;
        throw customError;
      }

      // Special handling for recipient not allowed error
      if (this._isRecipientNotAllowedError(error)) {
        logger.error('❌ Recipient phone number not in allowed list', {
          phoneNumber: phoneNumberDisplay,
          normalized: normalizedPayload.to,
          errorCode,
          errorMessage,
          help: 'Add this phone number to the allowed recipient list in WhatsApp Business Manager'
        });
        
        // Create a custom error with more context
        const customError = new Error(`Recipient ${phoneNumberDisplay} is not in the allowed list. Please add it in WhatsApp Business Manager.`);
        customError.code = 131030;
        customError.isRecipientNotAllowed = true;
        customError.phoneNumber = phoneNumberDisplay;
        customError.normalizedPhoneNumber = normalizedPayload.to;
        throw customError;
      }

      logger.error('Failed to send WhatsApp message', {
        phoneNumber: phoneNumberDisplay,
        normalized: normalizedPayload.to,
        error: errorData || error.message,
        status: error.response?.status,
        errorCode,
        errorType
      });
      throw error;
    }
  }

  /**
   * Send text message
   * @param {string} to - Recipient phone number
   * @param {string} text - Message text
   * @returns {Promise<Object>}
   */
  async sendText(to, text) {
    const normalizedTo = normalizePhoneNumber(to);
    
    // WhatsApp text message limit: 4096 characters
    const MAX_TEXT_LENGTH = 4096;
    let messageText = text;
    
    if (text && text.length > MAX_TEXT_LENGTH) {
      logger.warn('Text message too long, truncating', {
        originalLength: text.length,
        maxLength: MAX_TEXT_LENGTH
      });
      messageText = text.substring(0, MAX_TEXT_LENGTH - 3) + '...';
    }
    
    return this.send({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: normalizedTo,
      type: 'text',
      text: { body: messageText }
    });
  }

  /**
   * Send image message
   * @param {string} to - Recipient phone number
   * @param {string} imageUrl - Image URL
   * @param {string} [caption] - Optional caption
   * @returns {Promise<Object>}
   */
  async sendImage(to, imageUrl, caption = '') {
    const normalizedTo = normalizePhoneNumber(to);
    return this.send({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: normalizedTo,
      type: 'image',
      image: {
        link: imageUrl,
        caption: caption
      }
    });
  }

  /**
   * Send interactive button message
   * @param {string} to - Recipient phone number
   * @param {string} bodyText - Message body
   * @param {Array<{id: string, title: string}>} buttons - Up to 3 buttons
   * @param {string} [header] - Optional header text
   * @param {string} [footer] - Optional footer text
   * @returns {Promise<Object>}
   */
  async sendButtons(to, bodyText, buttons, header = null, footer = null) {
    const normalizedTo = normalizePhoneNumber(to);
    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: normalizedTo,
      type: 'interactive',
      interactive: {
        type: 'button',
        body: { text: bodyText },
        action: {
          buttons: buttons.slice(0, 3).map(btn => ({
            type: 'reply',
            reply: { id: btn.id, title: btn.title.slice(0, 20) }
          }))
        }
      }
    };

    if (header) {
      payload.interactive.header = { type: 'text', text: header };
    }
    if (footer) {
      payload.interactive.footer = { text: footer };
    }

    return this.send(payload);
  }

  /**
   * Send interactive list message
   * @param {string} to - Recipient phone number
   * @param {string} bodyText - Message body
   * @param {string} buttonText - Button text to open list
   * @param {Array<{title: string, rows: Array<{id: string, title: string, description?: string}>}>} sections
   * @returns {Promise<Object>}
   */
  async sendList(to, bodyText, buttonText, sections) {
    const normalizedTo = normalizePhoneNumber(to);
    return this.send({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: normalizedTo,
      type: 'interactive',
      interactive: {
        type: 'list',
        body: { text: bodyText },
        action: {
          button: buttonText.slice(0, 20),
          sections: sections.map(section => ({
            title: section.title.slice(0, 24),
            rows: section.rows.slice(0, 10).map(row => ({
              id: row.id,
              title: row.title.slice(0, 24),
              description: row.description?.slice(0, 72)
            }))
          }))
        }
      }
    });
  }

  /**
   * Send image with interactive buttons (for carousel items)
   * @param {string} to - Recipient phone number
   * @param {string} imageUrl - Image URL
   * @param {string} caption - Image caption
   * @param {Array<{id: string, title: string}>} buttons - Up to 3 buttons
   * @returns {Promise<Object>}
   */
  async sendImageWithButtons(to, imageUrl, caption, buttons) {
    const normalizedTo = normalizePhoneNumber(to);
    return this.send({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: normalizedTo,
      type: 'interactive',
      interactive: {
        type: 'button',
        header: {
          type: 'image',
          image: { link: imageUrl }
        },
        body: { text: caption },
        action: {
          buttons: buttons.slice(0, 3).map(btn => ({
            type: 'reply',
            reply: { id: btn.id, title: btn.title.slice(0, 20) }
          }))
        }
      }
    });
  }
}

module.exports = new WhatsAppClient();
