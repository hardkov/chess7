const { Chess } = require("chess.js");

const user = require("../models/user");
const game = require("../models/game");

function startGame(req, res) {
  const userToValidate = user.get(req.jwt.username);

  if (userToValidate == null) {
    return res.status(404).send({ errors: ["Requesting user does not exist"] });
  }

  let userToBeChallanged = user.get(req.body.username);

  if (userToBeChallanged == null) {
    return res.status(404).send({ errors: ["Challanged user does not exist"] });
  }

  if (userToBeChallanged === userToValidate) {
    return res.status(400).send({ errors: ["You can't challange yourself"] });
  }

  game.add({
    gameClient: new Chess(),
    whitePlayerName: userToValidate.username,
    blackPlayerName: userToBeChallanged.username,
  });

  res.status(201).send();
}

function checkIfPlaying(req, res) {
  const userToValidate = user.get(req.jwt.username);

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
