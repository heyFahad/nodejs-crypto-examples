const { createCipheriv, createDecipheriv, randomBytes } = require('crypto');
// iv here stands for Initialization Vector

// cipher message to encrypt
const message = 'I like turtles';

/**
 * `key` and `iv` need to be shared between the cipher and decipher parties. That is why they are being initiated here in a synchronous manner
 */
const key = randomBytes(32);
const iv = randomBytes(16); // This will randomize the output when it is encrypted. So the identical sequences of text will never produce the same cipher text.

// Encrypt the message
const cipher = createCipheriv('aes256', key, iv);
const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');

// Decrypt the message
const decipher = createDecipheriv('aes256', key, iv);
const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf8') + decipher.final('utf8');

console.log({ encryptedMessage, decryptedMessage });
