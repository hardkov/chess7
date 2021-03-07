const { removeGame } = require("../models/game");

module.exports = (io) => {
  const moveHandler = function (move) {
    const socket = this;
    const {
      gameClient,
      id,
      whitePlayerName,
      blackPlayerName,
    } = socket.gameData;
    const { username } = socket.userData;

    const userToMove =
      gameClient.turn() == "w" ? whitePlayerName : blackPlayerName;

    if (userToMove !== username) {
      socket.emit("move", {
        success: false,
        err: "not your move",
        currentPosition: gameClient.fen(),
      });
      return;
    }

    const moveConfirmation = gameClient.move(move);

    if (moveConfirmation == null) {
      socket.emit("move", {
        success: false,
        err: "invalid move",
        currentPosition: gameClient.fen(),
      });
      return;
    }

    io.to(id).emit("move", {
      success: true,
      currentPosition: gameClient.fen(),
    });

    if (gameClient.game_over()) {
      const clients = io.adapter.rooms.get(id);
      removeGame(id);

      for (let clientId of clients) {
        const clientSocket = io.sockets.get(clientId);
        clientSocket.disconnect(true);
      }
    }
  };

  return { moveHandler };
};
