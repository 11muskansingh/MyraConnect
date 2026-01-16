/**
 * Session Manager
 * Interface for session storage operations
 */

class SessionManager {
  constructor(store) {
    this.store = store;
  }

  /**
   * Get session for a user
   * @param {string} userId - WhatsApp phone number
   * @returns {Promise<Object|null>}
   */
  async get(userId) {
    return this.store.get(userId);
  }

  /**
   * Create or update session
   * @param {string} userId
   * @param {Object} data
   * @returns {Promise<void>}
   */
  async set(userId, data) {
    return this.store.set(userId, data);
  }

  /**
   * Partially update session
   * @param {string} userId
   * @param {Object} updates
   * @returns {Promise<Object>}
   */
  async update(userId, updates) {
    const existing = await this.get(userId) || {};
    const updated = { ...existing, ...updates, updatedAt: Date.now() };
    await this.set(userId, updated);
    return updated;
  }

  /**
   * Delete session
   * @param {string} userId
   * @returns {Promise<void>}
   */
  async delete(userId) {
    return this.store.delete(userId);
  }

  /**
   * Check if session exists
   * @param {string} userId
   * @returns {Promise<boolean>}
   */
  async has(userId) {
    return this.store.has(userId);
  }
}

module.exports = SessionManager;
