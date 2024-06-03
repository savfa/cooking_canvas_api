const crypto = require('crypto');

// crypto.randomBytes(16).toString('hex');
const salt = `9f4a62d9e98a004d69e3b7f1f8d9941c`;


const getPasswordHash = (password) => {
  return crypto.pbkdf2Sync(password, salt,
    1000, 64, `sha512`).toString(`hex`);
};

const validPassword = (hash, password) => {
  return hash === getPasswordHash(password)
};

exports.getPasswordHash = getPasswordHash;
exports.validPassword = validPassword;
