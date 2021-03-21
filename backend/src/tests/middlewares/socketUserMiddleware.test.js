const socketUserMiddleware = require("../../middlewares/socketUserMiddleware");
const user = require("../../models/user");

const user1 = {
  username: "Cris",
  passwordHash: "sajgalsdjalkdjl",
};

const notExistingUser = {
  username: "ImNotThere",
  passwordHash: "asdasdad",
};

beforeEach(() => {
  user.removeAll();

  user.add(user1);
});

afterEach(() => {
  user.removeAll();
});

test("should validate data", () => {
  const userData = { username: user1.username };
  const socket = { userData };

  const next = jest.fn();

  socketUserMiddleware(socket, next);

  expect(next).toHaveBeenCalledTimes(1);
  expect(next.mock.calls[0][0]).not.toBeDefined();
});

test("should not validate data (requesting user does not exists)", () => {
  const userData = { username: notExistingUser.username };
  const socket = { userData };

  const next = jest.fn();

  socketUserMiddleware(socket, next);

  expect(next).toHaveBeenCalledTimes(1);
  expect(next.mock.calls[0][0]).toBeDefined();
});

test("should not validate data (no userData)", () => {
  const join = jest.fn();
  const socket = {};

  const next = jest.fn();

  socketUserMiddleware(socket, next);

  expect(socket.gameData).not.toBeDefined();
  expect(next).toHaveBeenCalledTimes(1);
  expect(next.mock.calls[0][0]).toBeDefined();
  expect(join).not.toHaveBeenCalled();
});
