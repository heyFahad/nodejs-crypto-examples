/**
 * NOT SO GREAT METHOD FOR STORING PASSWORDS IN A DATABASE
 */
const { createHash } = require('crypto');

/**
 * A helper function that takes in a string as an input and returns the hashed string as the output.
 * @param {string} input Data input for which hash is to be generated.
 * @param {string} algorithm The hashing algorithm to use. Make sure that the string you are using for the createHash algorithm is actually the same as a string available from `openssl` on your machine. `SHA256` is used by default if no algorithm is passed.
 * @param {string} encoding Format of digest that is required. Can be either `base64`, `base64url`, `binary`, or `hex`. Default is `hex`.
 * @returns {string} The generated hash string
 */
function hash(input, algorithm = 'SHA256', encoding = 'hex') {
    return (
        // create a Hash object that will generate the hash digest using `'SHA256'` (Secure Hash Algorithm 2) algorithm (if no other algorithm is passed)
        createHash(algorithm)
            // update the hash content with the given `input` data. Update can be called many times with new data as it is streamed
            .update(input)
            // calculate the digest (output) of the data (`input`) passed to this function. The Hash object cannot be used again after this `hash.digest()` method is called
            .digest(encoding)
    );
}

// HOW TO COMPARE TWO HASHED PASSWORDS

let password = 'hi-mom!';
const hash1 = hash(password);
console.log(hash1);

// ... some point later in time

password = 'hi-mom!';
const hash2 = hash(password);
console.log(hash2);

// verify if both hashes are same or not
const match = hash1 === hash2;
console.log(match ? '✅ correct password' : '❌ password does not match');
