const { get } = require("../models/user");

const validateCredentialsMiddleware = (req, res, next) => {
  const { username, password } = req.body;

  if (username.length < 8) {
    return res.status(400).send({ errors: ["Too short username"] });
  }

  if (get(username) != null) {
    return res
      .status(400)
      .send({ errors: ["User with that username already exists"] });
  }

  if (password.length < 8) {
    return res.status(400).send({ errors: ["Too short password"] });
  }

  next();
};

module.exports = validateCredentialsMiddleware;
