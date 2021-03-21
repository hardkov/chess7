const { moveTypes, socketEvents, finishGame } = require("./helpers");

module.exports = (moveNamespace, io) => {
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
      socket.emit(socketEvents.move, {
        type: moveTypes.normal,
        success: false,
        err: "not your move",
        currentPosition: gameClient.fen(),
      });
      return;
    }

    const moveConfirmation = gameClient.move(move);

    if (moveConfirmation == null) {
      socket.emit(socketEvents.move, {
        type: moveTypes.normal,
        success: false,
        err: "invalid move",
        currentPosition: gameClient.fen(),
      });
      return;
    }

    moveNamespace.to(id).emit(socketEvents.move, {
      type: moveTypes.normal,
      success: true,
      currentPosition: gameClient.fen(),
    });

    io.emit(socketEvents.liveGames, {
      id,
      currentPosition: gameClient.fen(),
    });

    if (gameClient.game_over()) {
      finishGame(id, io, moveNamespace);
    }
  };

  return { moveHandler };
};
