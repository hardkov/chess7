const database = require("../../models/database");

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

database.connect();

beforeAll(async () => {
  await user.removeAll();
  await user.add(user1);
});

afterAll(async () => {
  await user.removeAll();
  await database.disconnect();
});

test("should validate data", async () => {
  const userData = { username: user1.username };
  const socket = { userData };

  const next = jest.fn();

  await socketUserMiddleware(socket, next);

  expect(next).toHaveBeenCalledTimes(1);
  expect(next.mock.calls[0][0]).not.toBeDefined();
});

test("should not validate data (requesting user does not exists)", async () => {
  const userData = { username: notExistingUser.username };
  const socket = { userData };

  const next = jest.fn();

  await socketUserMiddleware(socket, next);

  expect(next).toHaveBeenCalledTimes(1);
  expect(next.mock.calls[0][0]).toBeDefined();
});

test("should not validate data (no userData)", async () => {
  const join = jest.fn();
  const socket = {};

  const next = jest.fn();

  await socketUserMiddleware(socket, next);

  expect(next).toHaveBeenCalledTimes(1);
  expect(next.mock.calls[0][0]).toBeDefined();
  expect(join).not.toHaveBeenCalled();
});
