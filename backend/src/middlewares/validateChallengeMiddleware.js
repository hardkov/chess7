const user = require("../models/user");
const game = require("../models/game");

const validateChallengeMiddleware = async (req, res, next) => {
  const userToValidate = await user.get(req.jwt.username);

  if (userToValidate == null) {
    return res.status(404).send({ errors: ["No such user. Register first"] });
  }

  const userToBeChallenged = await user.get(req.body.username);

  if (userToBeChallenged == null) {
    return res.status(404).send({ errors: ["Challenged user does not exist"] });
  }

  if (userToBeChallenged._id.toString() == userToValidate._id.toString()) {
    return res.status(400).send({ errors: ["You can't challenge yourself"] });
  }

  if (game.findGameWithPlayer(userToValidate.username) != null) {
    return res.status(400).send({ errors: ["You are playing a game now"] });
  }

  if (game.findGameWithPlayer(userToBeChallenged.username) != null) {
    return res
      .status(400)
      .send({ errors: ["This player is playing a game now"] });
  }

  next();
};

module.exports = validateChallengeMiddleware;
