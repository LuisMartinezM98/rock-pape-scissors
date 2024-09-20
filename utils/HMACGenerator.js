const crypto = require('crypto');

class HMACGenerator {
  // Generate a cryptographically secure random key (256 bits)
  static generateKey() {
    return crypto.randomBytes(32).toString('hex');
  }

  // Generate HMAC using SHA-256
  static generateHMAC(key, message) {
    return crypto.createHmac('sha256', key).update(message).digest('hex');
  }
}

module.exports = HMACGenerator;
