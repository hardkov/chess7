const { socketEvents } = require("./helpers");

module.exports = (notificationNamespace, io) => {
  const gameNotificationHandler = function (enemy) {
    notificationNamespace.emit(socketEvents.gameStarted, enemy);
  };

  return { gameNotificationHandler };
};
