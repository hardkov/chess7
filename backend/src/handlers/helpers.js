const { removeGame } = require("../models/game");

moveTypes = {
  drawOffer: "DRAW_OFFER",
  drawAccept: "DRAW_ACCEPT",
  drawDecline: "DRAW_DECLINE",
  surrender: "SURRENDER",
  special: "SPECIAL",
  normal: "NORMAL",
};

const socketEvents = {
  move: "move",
  specialMove: "specialMove",
  gameStarted: "gameStarted",
  liveGames: "liveGames",
};

const finishGame = (gameId, mainChannel, roomChannel) => {
  mainChannel.emit(socketEvents.liveGames, {
    id: gameId,
  });

  const clients = roomChannel.adapter.rooms.get(gameId);
  removeGame(gameId);

  for (let clientId of clients) {
    const clientSocket = roomChannel.sockets.get(clientId);
    clientSocket.disconnect(false);
  }
};

module.exports = { moveTypes, socketEvents, finishGame };
