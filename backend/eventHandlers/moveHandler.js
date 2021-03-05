module.exports = (io) => {
  const moveHandler = function (move) {
    const socket = this;
    const game = socket.game;
    const gameId = socket.gameId;

    const moveConfirmation = game.gameClient.move(move);

    if (moveConfirmation == null) {
      socket.emit("move", {
        success: false,
        currentPosition: game.gameClient.fen(),
      });
      return;
    }

    socket.to(gameId).emit("move", {
      success: true,
      currentPosition: game.gameClient.fen(),
    });
  };

  return moveHandler;
};
