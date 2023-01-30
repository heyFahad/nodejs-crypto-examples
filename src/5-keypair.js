const { generateKeyPairSync } = require('crypto');

// generate the public and private key pair
const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 4096, // the length of your key in bits
    publicKeyEncoding: {
        type: 'spki', // recommended to be `spki` by the Node.js docs
        format: 'pem', // PEM = Privacy Enhanced Mail (shows the keys in base64 format)
    },
    privateKeyEncoding: {
        type: 'pkcs8', // recommended to be `pkcs8` by the Node.js docs
        format: 'pem', // PEM = Privacy Enhanced Mail (shows the keys in base64 format)
        // cipher: 'aes-256-cbc',
        // passphrase: 'top-secret',
    },
});

console.log(privateKey);
console.log(publicKey);

// export the key pair to use them in app
module.exports = {
    privateKey,
    publicKey,
};
