const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

// An in-memory users database
const USERS = [];

// define the signup logic in signup controller
function signup(email, password) {
    // Generates cryptographically strong pseudorandom data depending upon the `size` argument that indicates the number of bytes (Buffer) to generate.
    const salt = randomBytes(16).toString('hex'); // synchronous process

    // use scrypt (a computationally and memory-wise expensive PBKDF operation in order to make brute-force attacks unrewarding) to hash the password along with the generated salt
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');

    // finally, store the hashed password along with its generated salt in the database
    const user = { email, password: `${salt}:${hashedPassword}` };
    USERS.push(user);

    return user;
}

// define the login logic in login controller
function login(email, password) {
    // Get user from the database
    const user = USERS.find((usr) => usr.email === email);

    // Grab the salt from stored password and regenerate the password hash
    const [salt, key] = user.password.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);

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
const user = signup('fahad@example.com', 'Abcd123!');
console.log({ user });

const result = login('fahad@example.com', 'Abcd123');
console.log(result);
