const user = require("../models/user");
const game = require("../models/game");

const validateChallangeMiddleware = async (req, res, next) => {
  const userToValidate = await user.get(req.jwt.username);

  if (userToValidate == null) {
    return res.status(404).send({ errors: ["No such user. Register first"] });
  }

  const userToBeChallanged = await user.get(req.body.username);

  if (userToBeChallanged == null) {
    return res.status(404).send({ errors: ["Challanged user does not exist"] });
  }

  if (userToBeChallanged._id.toString() == userToValidate._id.toString()) {
    return res.status(400).send({ errors: ["You can't challange yourself"] });
  }

  if (game.findGameWithPlayer(userToValidate.username) != null) {
    return res.status(400).send({ errors: ["You are playing a game now"] });
  }

  if (game.findGameWithPlayer(userToBeChallanged.username) != null) {
    return res
      .status(400)
      .send({ errors: ["This player is playing a game now"] });
  }

  next();
};

module.exports = validateChallangeMiddleware;
