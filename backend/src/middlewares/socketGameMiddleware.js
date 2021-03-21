const { findGameWithPlayer } = require("../models/game");

const socketGameMiddleware = (socket, next) => {
  const { username } = socket.userData;

  const game = findGameWithPlayer(username);

  if (game == null) {
    const err = new Error("No game is being played");
    return next(err);
  }

  socket.gameData = game;
  socket.join(game.id);

  next();
};

module.exports = socketGameMiddleware;
