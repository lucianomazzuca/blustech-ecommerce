const jsonwebtoken = require("jsonwebtoken");

function genJWT(userId) {
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now / 1000)
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 30,
  });

  return signedToken;
}

module.exports = genJWT;
