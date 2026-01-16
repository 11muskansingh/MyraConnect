/**
 * Phone Number Utilities
 * Normalizes phone numbers for WhatsApp API (E.164 format without +)
 */

/**
 * Normalize phone number to WhatsApp API format
 * WhatsApp requires E.164 format without the + sign (e.g., "918077394795")
 * @param {string} phoneNumber - Phone number in any format
 * @returns {string} - Normalized phone number (digits only, no +, spaces, or dashes)
 */
function normalizePhoneNumber(phoneNumber) {
  if (!phoneNumber) {
    return phoneNumber;
  }

  // Remove all non-digit characters (+, spaces, dashes, parentheses, etc.)
  const normalized = phoneNumber.replace(/\D/g, '');

  return normalized;
}

/**
 * Format phone number for display (adds + prefix)
 * @param {string} phoneNumber - Normalized phone number
 * @returns {string} - Formatted phone number with +
 */
function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) {
    return phoneNumber;
  }

  // If it already has +, return as is
  if (phoneNumber.startsWith('+')) {
    return phoneNumber;
  }

  // Add + prefix
  return `+${phoneNumber}`;
}

module.exports = {
  normalizePhoneNumber,
  formatPhoneNumber
};
