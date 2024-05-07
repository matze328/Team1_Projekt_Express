const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

function createAccessToken(userId) {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "60m" });
  return accessToken;
}

function decodeAccessToken(accessToken) {
  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = { createAccessToken, decodeAccessToken };
