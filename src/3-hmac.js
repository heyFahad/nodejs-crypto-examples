const { createHmac } = require('crypto');

/**
 * Using `openssl` is a great way to generate a random strings like `openssl rand -base64 32`
 * Using an RSA key with openssl is way more secure than a random byte string for SECRET_KEYS
 */
const key1 = 'super-secret!';

// message that we want to hash
const message = 'boo 👻';

// An HMAC is created just like a normal Hash object. The only difference is that we need to pass the SECRET_KEY along with the hashing algorithm
const hmac1 = createHmac('sha256', key1).update(message).digest('hex');
console.log(hmac1);

// Same hash is produced every time we use the same SECRET_KEY. A changed KEY will always create a different hash as shown below:
const key2 = 'other-password';
const hmac2 = createHmac('sha256', key2).update(message).digest('hex');
console.log(hmac2);
