const { get } = require("../models/user");

const socketUserMiddleware = async (socket, next) => {
  if (socket.userData == null) {
    const err = new Error("Invalid user data");
    return next(err);
  }

  const { username } = socket.userData;

  const user = await get(username);
  if (user == null) {
    const err = new Error("No such user");
    return next(err);
  }

  next();
};

module.exports = socketUserMiddleware;
