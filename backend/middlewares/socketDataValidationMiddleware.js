const { findGameWithPlayer } = require("../models/game");
const { get } = require("../models/user");

const dataValidationMiddleware = (socket, next) => {
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

  const userToMove =
    game.gameClient.turn() == "w" ? game.whitePlayerName : game.blackPlayerName;

  if (userToMove !== username) {
    const err = new Error("Not your move");
    return next(err);
  }

  socket.game = game.gameClient;
  socket.gameId = game.id;
  socket.join(game.id);

  next();
};

module.exports = dataValidationMiddleware;
