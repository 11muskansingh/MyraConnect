/**
 * Booking Flow Handler
 * Manages multi-step booking process
 */

const logger = require('../utils/logger');
const whatsappClient = require('../whatsapp/client');

/**
 * Booking flow steps
 */
const BOOKING_STEPS = {
  INIT: 'init',
  CONFIRM_ITEM: 'confirm_item',
  COLLECT_DETAILS: 'collect_details',
  CONFIRM_BOOKING: 'confirm_booking',
  COMPLETED: 'completed'
};

/**
 * Start booking flow for an item
 * @param {Object} session - User session
 * @param {Object} item - Item to book
 * @returns {Object} Updated session
 */
function startBooking(session, item) {
  logger.info('Starting booking flow', { itemId: item.id, itemTitle: item.title });
  
  return {
    ...session,
    booking: {
      step: BOOKING_STEPS.CONFIRM_ITEM,
      item,
      startedAt: Date.now()
    }
  };
}

/**
 * Process booking flow step
 * @param {string} to - User phone number
 * @param {Object} session - User session
 * @param {Object} message - User message
 * @returns {Promise<Object>} Updated session
 */
async function processBookingStep(to, session, message) {
  if (!session.booking) {
    logger.warn('No active booking');
    return session;
  }

  const { step, item } = session.booking;
  
  switch (step) {
    case BOOKING_STEPS.CONFIRM_ITEM:
      return await handleConfirmItem(to, session, message);
      
    case BOOKING_STEPS.COLLECT_DETAILS:
      return await handleCollectDetails(to, session, message);
      
    case BOOKING_STEPS.CONFIRM_BOOKING:
      return await handleConfirmBooking(to, session, message);
      
    default:
      return session;
  }
}

/**
 * Handle item confirmation step
 */
async function handleConfirmItem(to, session, message) {
  const { item } = session.booking;
  const text = message.text?.toLowerCase() || message.buttonId || '';
  
  if (text.includes('yes') || text.includes('confirm') || text === 'confirm_yes') {
    // Move to collect details
    await whatsappClient.sendText(to, 
      `Great choice! 🎉\n\nYou selected: *${item.title}*\n${item.price || ''}\n\nPlease provide your travel dates (e.g., "15 Jan - 18 Jan")`
    );
    
    return {
      ...session,
      booking: {
        ...session.booking,
        step: BOOKING_STEPS.COLLECT_DETAILS
      }
    };
  } else if (text.includes('no') || text.includes('cancel') || text === 'confirm_no') {
    // Cancel booking
    await whatsappClient.sendText(to, 'No problem! Let me know if you\'d like to explore other options.');
    return cancelBooking(session);
  }
  
  // Re-prompt
  await whatsappClient.sendButtons(to, 
    `Would you like to book *${item.title}*?\n${item.price || ''}`,
    [
      { id: 'confirm_yes', title: '✅ Yes, Book' },
      { id: 'confirm_no', title: '❌ Cancel' }
    ]
  );
  
  return session;
}

/**
 * Handle details collection step
 */
async function handleCollectDetails(to, session, message) {
  const text = message.text || '';
  
  // Basic date validation (could be enhanced)
  if (text.length < 3) {
    await whatsappClient.sendText(to, 'Please provide your travel dates (e.g., "15 Jan - 18 Jan")');
    return session;
  }
  
  // Store dates and move to confirmation
  await whatsappClient.sendButtons(to,
    `📋 *Booking Summary*\n\n` +
    `🏨 ${session.booking.item.title}\n` +
    `📅 ${text}\n` +
    `💰 ${session.booking.item.price || 'Price on request'}\n\n` +
    `Confirm your booking?`,
    [
      { id: 'book_confirm', title: '✅ Confirm' },
      { id: 'book_cancel', title: '❌ Cancel' }
    ]
  );
  
  return {
    ...session,
    booking: {
      ...session.booking,
      step: BOOKING_STEPS.CONFIRM_BOOKING,
      dates: text
    }
  };
}

/**
 * Handle final booking confirmation
 */
async function handleConfirmBooking(to, session, message) {
  const text = message.text?.toLowerCase() || message.buttonId || '';
  
  if (text.includes('confirm') || text === 'book_confirm') {
    const { item, dates } = session.booking;
    
    // Send booking confirmation
    await whatsappClient.sendText(to,
      `🎉 *Booking Confirmed!*\n\n` +
      `📍 ${item.title}\n` +
      `📅 ${dates}\n` +
      `💰 ${item.price || 'Price on request'}\n\n` +
      `Booking ID: #${Date.now().toString(36).toUpperCase()}\n\n` +
      `Thank you for booking with us! You'll receive a confirmation email shortly.`
    );
    
    logger.info('Booking completed', { itemId: item.id, dates });
    
    // Clear booking state
    return cancelBooking(session);
  } else {
    await whatsappClient.sendText(to, 'Booking cancelled. Feel free to explore more options!');
    return cancelBooking(session);
  }
}

/**
 * Cancel/clear booking from session
 * @param {Object} session
 * @returns {Object} Updated session
 */
function cancelBooking(session) {
  const { booking, ...rest } = session;
  logger.debug('Booking cleared');
  return rest;
}

/**
 * Check if booking is in progress
 * @param {Object} session
 * @returns {boolean}
 */
function hasActiveBooking(session) {
  return !!session?.booking;
}

module.exports = {
  BOOKING_STEPS,
  startBooking,
  processBookingStep,
  cancelBooking,
  hasActiveBooking
};
