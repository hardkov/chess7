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

  res.status(201).send();
}

module.exports = {
  startGame,
  checkIfPlaying,
};
