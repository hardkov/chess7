const JWT = require("jsonwebtoken");
const crypto = require("crypto");

const JWTSecret = require("./secrets").JWTSecret;

function generateJWTToken(data) {
  const salt = crypto.randomBytes(16).toString("base64");
  const hash = crypto
    .createHmac("sha512", salt)
    .update(data.id)
    .digest("base64");

  data.refresherKey = salt;

  const token = JWT.sign(data, JWTSecret);
  const buffer = Buffer.from(hash);
  const refresherToken = buffer.toString("base64");

  return { token, refresherToken };
}

function generatePasswordHash(password) {
  const salt = crypto.randomBytes(16).toString("base64");
  const hash = crypto
    .createHmac("sha512", salt)
    .update(password)
    .digest("base64");

  return salt + "$" + hash;
}

function validatePassword(passwordProvided, passwordHash) {
  if (typeof passwordProvided != "string") return false;

  const passwordFields = passwordHash.split("$");
  const salt = passwordFields[0];

  const hash = crypto
    .createHmac("sha512", salt)
    .update(passwordProvided)
    .digest("base64");

  if (hash !== passwordFields[1]) {
    return false;
  }

  return true;
}

module.exports = {
  generateJWTToken,
  generatePasswordHash,
  validatePassword,
};
