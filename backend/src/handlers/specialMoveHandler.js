const { update } = require("../models/game");
const { moveTypes, socketEvents, finishGame } = require("./helpers");

module.exports = (moveNamespace, io) => {
  const specialMoveHandler = function (move) {
    const socket = this;
    const { id, whitePlayerName } = socket.gameData;
    const { username } = socket.userData;

    if (move === moveTypes.surrender) {
      const winner = username === whitePlayerName ? "black" : "white";

      moveNamespace.to(id).emit(socketEvents.move, {
        type: moveTypes.special,
        move: moveTypes.surrender,
        winner: winner,
      });

      finishGame(id, io, moveNamespace);
    } else if (move === moveTypes.drawOffer) {
      socket.gameData.drawOfferedBy = username;
      update(socket.gameData);

      moveNamespace.to(id).emit(socketEvents.move, {
        type: moveTypes.special,
        move: moveTypes.drawOffer,
        sender: username,
      });
    } else if (move === moveTypes.drawAccept) {
      const { drawOfferedBy } = socket.gameData;

      if (drawOfferedBy !== username) {
        moveNamespace.to(id).emit(socketEvents.move, {
          type: moveTypes.special,
          move: moveTypes.drawAccept,
        });

        finishGame(id, io, moveNamespace);
      }
    } else if (move === moveTypes.drawDecline) {
      socket.gameData.drawOfferedBy = null;
      update(socket.gameData);

      moveNamespace.to(id).emit(socketEvents.move, {
        type: moveTypes.special,
        move: moveTypes.drawDecline,
      });
    }
  };

  return { specialMoveHandler };
};
