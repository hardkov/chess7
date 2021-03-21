const { findGameWithPlayer } = require("../models/game");
const { get } = require("../models/user");

const socketUserMiddleware = (socket, next) => {
  if (socket.userData == null) {
    const err = new Error("Invalid user data");
    return next(err);
  }

  const { username } = socket.userData;

  if (get(username) == null) {
    const err = new Error("No such user");
    return next(err);
  }

  next();
};

module.exports = socketUserMiddleware;
