const moveTypes = require("./moveTypes");
const { removeGame } = require("../models/game");

module.exports = (io) => {
  const specialMoveHandler = function (move) {
    const socket = this;
    const { gameClient, id, whitePlayerName } = socket.gameData;
    const { username } = socket.userData;

    if (move === moveTypes.surrender) {
      const winner = username === whitePlayerName ? "black" : "white";

      io.to(id).emit("move", {
        type: moveTypes.special,
        move: moveTypes.surrender,
        winner: winner,
      });

      const clients = io.adapter.rooms.get(id);
      removeGame(id);

      for (let clientId of clients) {
        const clientSocket = io.sockets.get(clientId);
        clientSocket.disconnect(true);
      }
    }

    return;

    ///
    io.to(id).emit("move", {
      type: moveTypes.special,
      move: moveTypes.drawOffer,
      from: username,
    });

    io.to(id).emit("move", {
      type: moveTypes.special,
      move: moveTypes.drawAccept,
      from: username,
    });

    if (gameClient.game_over()) {
      const clients = io.adapter.rooms.get(id);
      removeGame(id);

      for (let clientId of clients) {
        const clientSocket = io.sockets.get(clientId);
        clientSocket.disconnect(true);
      }
    }
    // Surrender, Draw offer, Draw accept

    // const userToMove =
    //   gameClient.turn() == "w" ? whitePlayerName : blackPlayerName;

    // if (userToMove !== username) {
    //   socket.emit("specialMoves", {
    //     success: false,
    //     err: "not your move",
    //     currentPosition: gameClient.fen(),
    //   });
    //   return;
    // }

    // const moveConfirmation = gameClient.move(move);

    // if (moveConfirmation == null) {
    //   socket.emit("move", {
    //     success: false,
    //     err: "invalid move",
    //     currentPosition: gameClient.fen(),
    //   });
    //   return;
    // }
  };

  return { specialMoveHandler };
};
