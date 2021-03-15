const moveTypes = require("./moveTypes");
const { removeGame } = require("../models/game");

module.exports = (io) => {
  const specialMoveHandler = function (move) {
    const socket = this;
    const { id, whitePlayerName } = socket.gameData;
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
    } else if (move === moveTypes.drawOffer) {
      socket.gameData.drawOfferedBy = username;

      io.to(id).emit("move", {
        type: moveTypes.special,
        move: moveTypes.drawOffer,
        sender: username,
      });
    } else if (move === moveTypes.drawAccept) {
      const { drawOfferedBy } = socket.gameData;

      if (drawOfferedBy !== username) {
        io.to(id).emit("move", {
          type: moveTypes.special,
          move: moveTypes.drawAccept,
        });
        const clients = io.adapter.rooms.get(id);
        removeGame(id);

        for (let clientId of clients) {
          const clientSocket = io.sockets.get(clientId);
          clientSocket.disconnect(true);
        }
      }
    } else if (move === moveTypes.drawDecline) {
      io.to(id).emit("move", {
        type: moveTypes.special,
        move: moveTypes.drawDecline,
      });
    }
  };

  return { specialMoveHandler };
};
