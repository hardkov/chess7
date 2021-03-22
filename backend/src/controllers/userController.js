const user = require("../models/user");
const authHelpers = require("../auth/authHelpers");

const generateJWTToken = authHelpers.generateJWTToken;
const generatePasswordHash = authHelpers.generatePasswordHash;

async function register(req, res) {
  const passwordHash = generatePasswordHash(req.body.password);

  const userId = await user.add({
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

async function getUserList(req, res) {
  const userToValidate = await user.get(req.jwt.username);

  if (userToValidate == null) {
    return res.status(404).send({ errors: ["No such user. Register first"] });
  }

  const userList = await user.getAll();

  res.status(200).send({
    userList: userList,
  });
}

module.exports = {
  register,
  login,
  getUserList,
};
