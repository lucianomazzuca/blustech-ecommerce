const bcrypt = require('bcrypt');

async function genPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

async function validatePassword(password, hash) {
  const result = await bcrypt.compare(password, hash);
  return result;
}

module.exports = { genPassword, validatePassword };