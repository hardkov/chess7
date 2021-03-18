const { removeGame } = require("../models/game");

moveTypes = {
  drawOffer: "DRAW_OFFER",
  drawAccept: "DRAW_ACCEPT",
  drawDecline: "DRAW_DECLINE",
  surrender: "SURRENDER",
  special: "SPECIAL",
  normal: "NORMAL",
};

const finishGame = (gameId, mainChannel, roomChannel) => {
  mainChannel.emit("liveGames", {
    id: gameId,
  });

  const clients = roomChannel.adapter.rooms.get(gameId);
  removeGame(gameId);

  for (let clientId of clients) {
    const clientSocket = roomChannel.sockets.get(clientId);
    clientSocket.disconnect(true);
  }
};

module.exports = { moveTypes, finishGame };
