/**
 * In-Memory Session Store
 * Map-based store with TTL auto-expiry
 */

const config = require('../config');
const logger = require('../utils/logger');

class MemoryStore {
  constructor(ttlMinutes = config.session.ttlMinutes) {
    this.store = new Map();
    this.ttl = ttlMinutes * 60 * 1000; // Convert to milliseconds
    
    // Cleanup expired sessions every minute
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
    
    logger.info(`MemoryStore initialized with TTL: ${ttlMinutes} minutes`);
  }

  /**
   * Get session data
   * @param {string} key
   * @returns {Object|null}
   */
  get(key) {
    const entry = this.store.get(key);
    
    if (!entry) {
      return null;
    }
    
    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    
    return entry.data;
  }

  /**
   * Set session data with TTL
   * @param {string} key
   * @param {Object} data
   */
  set(key, data) {
    this.store.set(key, {
      data,
      expiresAt: Date.now() + this.ttl
    });
  }

  /**
   * Delete session
   * @param {string} key
   */
  delete(key) {
    this.store.delete(key);
  }

  /**
   * Check if session exists
   * @param {string} key
   * @returns {boolean}
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Remove expired entries
   */
  cleanup() {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [key, entry] of this.store) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      logger.debug(`Cleaned up ${cleaned} expired sessions`);
    }
  }

  /**
   * Get store size
   * @returns {number}
   */
  size() {
    return this.store.size;
  }

  /**
   * Clear all sessions
   */
  clear() {
    this.store.clear();
  }

  /**
   * Stop cleanup interval
   */
  destroy() {
    clearInterval(this.cleanupInterval);
  }
}

module.exports = MemoryStore;
