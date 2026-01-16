/**
 * Myra API Payload Builder
 * Builds request payloads for Myra WebSocket API
 */

const { v4: uuidv4 } = require('uuid');
const config = require('../config');

/**
 * Generate common headers for Myra API
 * @returns {Object}
 */
function buildHeaders() {
  return {
    'request-id': uuidv4(),
    'session-id': config.myra.sessionId || uuidv4(),
    'journey-id': config.myra.sessionId || uuidv4(),
    'org': config.myra.org,
    'uuid': '',
    'profileType': 'PERSONAL',
    'deviceId': config.myra.deviceId || uuidv4(),
    'deviceType': 'pwa',
    'platform': 'pwa',
    'os': 'WhatsApp Bot',
    'osVersion': '1.0.0',
    'timezone': 'Asia/Kolkata',
    'lang': 'en',
    'Content-Type': 'application/json',
    'uiVersion': 'travelplex_newUI',
    'travelplexPage': 'chat:home_page|travelplex',
    'test': 'travelplex',
    'trafficSource': 'myra',
    'selectedSttLanguage': 'en-IN',
    'supportedNodes': '{"multiLanguageSupported":true}'
  };
}

/**
 * Build NEW_CHAT payload
 * @param {string} message - User message text
 * @param {string} [userId] - Optional user identifier
 * @returns {Object}
 */
function buildNewChatPayload(message, userId = null) {
  const timestamp = Date.now().toString();
  
  return {
    eventType: 'NEW_CHAT',
    uiMetadata: {
      tempId: timestamp,
      clientTraceId: `${timestamp}-4`
    },
    data: {
      context: {
        lob: 'COMMONS',
        lobCategory: 'COMMONS',
        view: 'my_account_landing',
        prevPage: null,
        platform: 'pwa'
      },
      expertMetadata: {},
      contextMetadata: {
        pageContext: {
          lob: 'COMMONS',
          lobCategory: 'COMMONS',
          pageName: 'my_account_landing',
          prevPageName: null
        },
        searchContext: {}
      },
      botMetadata: {
        conversationId: null
      },
      message: {
        isDraft: true,
        lang: 'en-IN',
        id: timestamp,
        content: [
          { type: 'TEXT', value: message }
        ],
        role: 'USER'
      },
      messageSource: 'TEXT'
    },
    headers: buildHeaders()
  };
}

/**
 * Build POST_MESSAGE payload
 * @param {string} conversationId - Existing conversation ID
 * @param {string} message - User message text
 * @returns {Object}
 */
function buildPostMessagePayload(conversationId, message) {
  const timestamp = Date.now().toString();
  
  return {
    eventType: 'POST_MESSAGE',
    uiMetadata: {
      tempId: timestamp,
      clientTraceId: `${timestamp}-4`
    },
    data: {
      context: {
        lob: 'COMMONS',
        lobCategory: 'COMMONS',
        view: 'chat',
        prevPage: null,
        platform: 'pwa'
      },
      expertMetadata: {},
      botMetadata: {
        conversationId: conversationId
      },
      message: {
        isDraft: true,
        lang: 'en-IN',
        id: timestamp,
        content: [
          { type: 'TEXT', value: message }
        ],
        role: 'USER'
      },
      messageSource: 'TEXT'
    },
    headers: buildHeaders()
  };
}

/**
 * Build HEART_BEAT payload
 * @returns {Object}
 */
function buildHeartbeatPayload() {
  return {
    eventType: 'HEART_BEAT',
    data: {
      context: {
        lob: 'COMMONS',
        view: 'LISTING',
        platform: 'pwa'
      },
      expertMetadata: {}
    },
    headers: buildHeaders()
  };
}

module.exports = {
  buildHeaders,
  buildNewChatPayload,
  buildPostMessagePayload,
  buildHeartbeatPayload
};
