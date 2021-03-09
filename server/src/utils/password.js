const bcrypt = require('bcrypt');

async function genPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

function validPassword(password, hash) {
  const result = bcrypt.compareSync(password, hash);
  return result;
}

module.exports = { genPassword, validPassword };