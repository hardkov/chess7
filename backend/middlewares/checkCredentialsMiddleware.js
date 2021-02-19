const user = require("../models/user");
const validatePassword = require("../auth/authHelpers").validatePassword;

function checkCredentials(req, res, next) {
  let userToBeLogged = user.get(req.body.username);

  if (userToBeLogged == null) {
    return res.status(404).send({ errors: ["No such user. Register first"] });
  }

  const isPasswordValid = validatePassword(
    req.body.password,
    userToBeLogged.passwordHash
  );

  if (!isPasswordValid) {
    return res.status(400).send({ errors: ["Invalid credentials"] });
  }

  req.body = {
    id: userToBeLogged.id,
    username: userToBeLogged.username,
  };

  return next();
}

module.exports = checkCredentials;
