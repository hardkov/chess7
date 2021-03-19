const jwt = require("jsonwebtoken");

const JWTSecret = require("../auth/secrets").JWTSecret;

const socketJWTMiddleware = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (token) {
    try {
      const userData = jwt.verify(token, JWTSecret);
      socket.userData = userData;
      return next();
    } catch (error) {}
  }

  const err = new Error("not authorized");
  next(err);
};

module.exports = socketJWTMiddleware;
