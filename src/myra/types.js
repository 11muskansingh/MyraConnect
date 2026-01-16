/**
 * Myra AI Response Types
 * JSDoc type definitions for type safety
 */

/**
 * @typedef {Object} MyraTextContent
 * @property {'TEXT'} type
 * @property {string} value
 */

/**
 * @typedef {Object} MyraMessage
 * @property {string} id - Message ID
 * @property {'USER'|'ASSISTANT'} role
 * @property {number} createdAt - Timestamp
 * @property {string} lang - Language code
 * @property {Array<MyraTextContent>} content
 * @property {boolean} [isCompleted]
 * @property {boolean} [showBookmarkFeedback]
 */

/**
 * @typedef {Object} MyraNewChatCreatedData
 * @property {string} conversationId
 * @property {boolean} showOverlay
 * @property {MyraMessage} message
 */

/**
 * @typedef {Object} MyraAssistantReplyData
 * @property {'ASSISTANT_REPLY'} eventType
 * @property {string} conversationId
 * @property {string} [leadingQuestion] - The AI response text
 * @property {Array<string>} [suggestions] - Suggested follow-ups
 * @property {boolean} showOverlay
 * @property {MyraMessage} message
 */

/**
 * @typedef {Object} MyraEvent
 * @property {'NEW_CHAT_CREATED'|'NEW_MESSAGE'} eventType
 * @property {MyraNewChatCreatedData|MyraAssistantReplyData} data
 * @property {Object} uiMetadata
 * @property {boolean} success
 */

/**
 * @typedef {Object} CarouselItem
 * @property {string} id
 * @property {string} title
 * @property {string} [subtitle]
 * @property {string} [price]
 * @property {string} [image]
 * @property {string} [rating]
 */

/**
 * @typedef {Object} CarouselState
 * @property {Array<CarouselItem>} items
 * @property {number} index - Current item index
 */

/**
 * @typedef {Object} UserSession
 * @property {string} conversationId - Myra conversation ID
 * @property {string} [currentIntent]
 * @property {CarouselState} [carousel] - Active carousel state
 * @property {Object} [booking] - Booking flow state
 * @property {number} createdAt
 * @property {number} updatedAt
 */

module.exports = {
  // Export empty object - types are for documentation only
};
