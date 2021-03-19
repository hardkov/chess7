const { findGameWithPlayer } = require("../models/game");
const { get } = require("../models/user");

const dataValidationMiddleware = (socket, next) => {
  if (socket.userData == null) {
    const err = new Error("Invalid user data");
    return next(err);
  }
  const { username } = socket.userData;

  if (get(username) == null) {
    const err = new Error("No such user");
    return next(err);
  }

  const game = findGameWithPlayer(username);

  if (game == null) {
    const err = new Error("No game is being played");
    return next(err);
  }

  socket.gameData = game;
  socket.join(game.id);

  next();
};

module.exports = dataValidationMiddleware;
