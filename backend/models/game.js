let games = [];

function add(game) {
  const id = games.length.toString();

  game.id = id;
  games.push(game);

  return id;
}

function get(gameId) {
  for (let game of games) {
    if (game.id === gameId) {
      return game;
    }
  }
}

function findGameWithPlayer(username) {
  for (let game of games) {
    if (
      game.whitePlayerName === username ||
      game.blackPlayerName === username
    ) {
      return game;
    }
  }
}

function getAll() {
  return games;
}

function removeGame(gameId) {
  games = games.filter((game) => game.id !== gameId);
}

function removeAll() {
  games = [];
}

module.exports = {
  add,
  get,
  findGameWithPlayer,
  getAll,
  removeGame,
  removeAll,
};
