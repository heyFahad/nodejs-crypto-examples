/**
 * USE SAMPLE CODE FROM THIS FILE TO STORE AND VALIDATE USER PASSWORDS IN ANY AUTHENTICATION CONTROLLER
 */
const { promisify } = require('util');
const { scrypt, randomBytes, timingSafeEqual } = require('crypto');

const randomBytesAsync = promisify(randomBytes);
const scryptAsync = promisify(scrypt);

// An in-memory users database
const USERS = [];

// define the signup logic in signup controller
async function signup(email, password) {
    // Generates cryptographically strong pseudorandom data depending upon the `size` argument that indicates the number of bytes (Buffer) to generate.
    let salt = undefined;
    try {
        const bytesBuffer = await randomBytesAsync(16);
        salt = bytesBuffer.toString('hex');
    } catch (err) {
        console.error({ err });
        throw err;
    }

    // use scrypt (a computationally and memory-wise expensive PBKDF operation in order to make brute-force attacks unrewarding) to hash the password along with the generated salt
    let hashedPassword = undefined;
    try {
        const derivedKey = await scryptAsync(password, salt, 64);
        hashedPassword = derivedKey.toString('hex');
    } catch (err) {
        console.error({ err });
        throw err;
    }

    // finally, store the hashed password along with its generated salt in the database
    const user = { email, password: `${salt}:${hashedPassword}` };
    USERS.push(user);

    return user;
}

// define the login logic in login controller
async function login(email, password) {
    // Get user from the database
    const user = USERS.find((usr) => usr.email === email);

    // Grab the salt from stored password and regenerate the password hash
    const [salt, key] = user.password.split(':');
    const hashedBuffer = await scryptAsync(password, salt, 64);

    // Instead of directly comparing the hashed strings of the password, use the `timingSafeEqual` function to prevent the timing attacks (where hackers measure the amount of time it takes to perform an operation to obtain information about the value)
    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    if (match) {
        return 'login success!';
    } else {
        return 'login failed!';
    }
}

// test the authentication flow
(async () => {
    const user = await signup('fahad@example.com', 'Abcd123!');
    console.log({ user });

    const result = await login('fahad@example.com', 'Abcd123!');
    console.log(result);
})();
