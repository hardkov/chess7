const user = require("../models/user");
const authHelpers = require("../auth/authHelpers");

const generateJWTToken = authHelpers.generateJWTToken;
const generatePasswordHash = authHelpers.generatePasswordHash;

function register(req, res) {
  const passwordHash = generatePasswordHash(req.body.password);

  const userId = user.add({
    username: req.body.username,
    passwordHash,
  });

  req.body = {
    id: userId,
    username: req.body.username,
  };

  const { token, refresherToken } = generateJWTToken(req.body);

  res.status(201).send({
    accessToken: token,
    refresherToken: refresherToken,
  });
}

function login(req, res) {
  const { token, refresherToken } = generateJWTToken(req.body);

  res.status(201).send({
    accessToken: token,
    refresherToken: refresherToken,
  });
}

function getUserList(req, res) {
  const userToValidate = user.get(req.jwt.username);

  if (userToValidate == null) {
    return res.status(404).send({ errors: ["No such user. Register first"] });
  }

  res.status(200).send({
    userList: user.getAll(),
  });
}

module.exports = {
  register,
  login,
  getUserList,
};
