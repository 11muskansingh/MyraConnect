/**
 * Carousel State Machine
 * Manages fake carousel navigation state
 */

const logger = require('../utils/logger');

/**
 * Initialize carousel in session
 * @param {Object} session - User session
 * @param {Array} items - Carousel items
 * @returns {Object} Updated session
 */
function initCarousel(session, items) {
  logger.info('Initializing carousel', { itemCount: items.length });
  
  return {
    ...session,
    carousel: {
      items,
      index: 0,
      startedAt: Date.now()
    }
  };
}

/**
 * Move to next item in carousel
 * @param {Object} session
 * @returns {Object} Updated session
 */
function nextItem(session) {
  if (!session.carousel) {
    logger.warn('No active carousel');
    return session;
  }

  const { items, index } = session.carousel;
  const newIndex = Math.min(index + 1, items.length - 1);
  
  logger.debug('Carousel next', { from: index, to: newIndex });
  
  return {
    ...session,
    carousel: {
      ...session.carousel,
      index: newIndex
    }
  };
}

/**
 * Move to previous item in carousel
 * @param {Object} session
 * @returns {Object} Updated session
 */
function prevItem(session) {
  if (!session.carousel) {
    logger.warn('No active carousel');
    return session;
  }

  const { index } = session.carousel;
  const newIndex = Math.max(index - 1, 0);
  
  logger.debug('Carousel prev', { from: index, to: newIndex });
  
  return {
    ...session,
    carousel: {
      ...session.carousel,
      index: newIndex
    }
  };
}

/**
 * Get current carousel item
 * @param {Object} session
 * @returns {Object|null} Current item and metadata
 */
function getCurrentItem(session) {
  if (!session.carousel) {
    return null;
  }

  const { items, index } = session.carousel;
  
  return {
    item: items[index],
    meta: {
      index,
      total: items.length,
      isFirst: index === 0,
      isLast: index === items.length - 1
    }
  };
}

/**
 * Get item by ID from carousel
 * @param {Object} session
 * @param {string} itemId
 * @returns {Object|null}
 */
function getItemById(session, itemId) {
  if (!session.carousel) {
    return null;
  }

  return session.carousel.items.find(item => item.id === itemId) || null;
}

/**
 * Clear carousel from session
 * @param {Object} session
 * @returns {Object} Updated session
 */
function clearCarousel(session) {
  const { carousel, ...rest } = session;
  logger.debug('Carousel cleared');
  return rest;
}

/**
 * Check if carousel is active
 * @param {Object} session
 * @returns {boolean}
 */
function hasActiveCarousel(session) {
  return !!session?.carousel?.items?.length;
}

module.exports = {
  initCarousel,
  nextItem,
  prevItem,
  getCurrentItem,
  getItemById,
  clearCarousel,
  hasActiveCarousel
};
