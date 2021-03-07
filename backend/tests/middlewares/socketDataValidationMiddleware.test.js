const { Chess } = require("chess.js");

const dataValidationMiddleware = require("../../middlewares/socketDataValidationMiddleware");
const user = require("../../models/user");
const game = require("../../models/game");

const user1FromGame1 = {
  username: "Adrian",
  passwordHash: "asdsad",
};

const user2FromGame1 = {
  username: "Brian",
  passwordHash: "sajdalsdjalkdjl",
};

const userNotPlaying1 = {
  username: "Cris",
  passwordHash: "sajgalsdjalkdjl",
};

const userNotPlaying2 = {
  username: "Daniel",
  passwordHash: "sajgaldjalkdjl",
};

const notExistingUser = {
  username: "ImNotThere",
  passwordHash: "asdasdad",
};

beforeEach(() => {
  user.removeAll();
  game.removeAll();

  user.add(user1FromGame1);
  user.add(user2FromGame1);
  user.add(userNotPlaying1);
  user.add(userNotPlaying2);

  game.add({
    gameClient: new Chess(),
    whitePlayerName: user1FromGame1.username,
    blackPlayerName: user2FromGame1.username,
  });
});

test("should validate data", () => {
  const userData = { username: user1FromGame1.username };
  const join = jest.fn();
  const socket = { userData, join };

  const next = jest.fn();

  dataValidationMiddleware(socket, next);
  const userGame = game.findGameWithPlayer(user1FromGame1.username);

  expect(socket.gameData).toEqual(userGame);
  expect(next).toHaveBeenCalledTimes(1);
  expect(next.mock.calls[0][0]).not.toBeDefined();
  expect(join).toHaveBeenCalledTimes(1);
  expect(join.mock.calls[0][0]).toBe(userGame.id);
});

test("should not validate data (requesting user does not exists)", () => {
  const userData = { username: notExistingUser.username };
  const join = jest.fn();
  const socket = { userData, join };

  const next = jest.fn();

  dataValidationMiddleware(socket, next);

  expect(socket.gameData).not.toBeDefined();
  expect(next).toHaveBeenCalledTimes(1);
  expect(next.mock.calls[0][0]).toBeDefined();
  expect(join).not.toHaveBeenCalled();
});

test("should not validate data (a game is not being played)", () => {
  const userData = { username: notExistingUser.username };
  const join = jest.fn();
  const socket = { userData, join };

  const next = jest.fn();

  dataValidationMiddleware(socket, next);

  expect(socket.gameData).not.toBeDefined();
  expect(next).toHaveBeenCalledTimes(1);
  expect(next.mock.calls[0][0]).toBeDefined();
  expect(join).not.toHaveBeenCalled();
});
