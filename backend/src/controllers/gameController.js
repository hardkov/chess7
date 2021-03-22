const { Chess } = require("chess.js");

const user = require("../models/user");
const game = require("../models/game");

async function startGame(req, res) {
  const userToValidate = await user.get(req.jwt.username);
  const userToBeChallanged = await user.get(req.body.username);

  game.add({
    gameClient: new Chess(),
    whitePlayerName: userToValidate.username,
    blackPlayerName: userToBeChallanged.username,
  });

  res.status(201).send();
}

async function checkIfPlaying(req, res) {
  const userToValidate = await user.get(req.jwt.username);

  if (userToValidate == null) {
    return res.status(404).send({ errors: ["No such user. Register first"] });
  }

  const currentlyPlayedGame = game.findGameWithPlayer(userToValidate.username);

  if (currentlyPlayedGame == null) {
    return res.status(400).send({ errors: ["This user does not play a game"] });
  }

  res.status(201).send({
    gameId: currentlyPlayedGame.id,
    fen: currentlyPlayedGame.gameClient.fen(),
    drawOfferedBy: currentlyPlayedGame.drawOfferedBy,
    whitePlayerName: currentlyPlayedGame.whitePlayerName,
    blackPlayerName: currentlyPlayedGame.blackPlayerName,
  });
}

function getGameList(req, res) {
  const games = game
    .getAll()
    .map((game) => ({ id: game.id, position: game.gameClient.fen() }));

  res.status(200).send({
    gameList: games,
  });
}

module.exports = {
  startGame,
  checkIfPlaying,
  getGameList,
};
