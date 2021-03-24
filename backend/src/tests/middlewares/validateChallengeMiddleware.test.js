const database = require("../../models/database");

const { Chess } = require("chess.js");
const httpMocks = require("node-mocks-http");

const validateChallengeMiddleware = require("../../middlewares/validateChallengeMiddleware");
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

database.connect();

beforeAll(async () => {
  await user.removeAll();
  game.removeAll();

  await user.add(user1FromGame1);
  await user.add(user2FromGame1);
  await user.add(userNotPlaying1);
  await user.add(userNotPlaying2);

  game.add({
    gameClient: new Chess(),
    whitePlayerName: user1FromGame1.username,
    blackPlayerName: user2FromGame1.username,
  });
});

afterAll(async () => {
  game.removeAll();
  await user.removeAll();
  await database.disconnect();
});

test("should validate game", async () => {
  const req = httpMocks.createRequest({
    jwt: {
      username: userNotPlaying1.username,
    },
    body: {
      username: userNotPlaying2.username,
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await validateChallengeMiddleware(req, res, next);

  expect(res.statusCode).toEqual(200);
  expect(next).toHaveBeenCalled();
});

test("should not validate game(requesting user does not exists)", async () => {
  const req = httpMocks.createRequest({
    jwt: {
      username: notExistingUser.username,
    },
    body: {
      username: userNotPlaying2.username,
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await validateChallengeMiddleware(req, res, next);

  expect(res.statusCode).toEqual(404);
  expect(next).not.toHaveBeenCalled();
});

test("should not validate game(user to be challenged does not exist)", async () => {
  const req = httpMocks.createRequest({
    jwt: {
      username: userNotPlaying1.username,
    },
    body: {
      username: notExistingUser.username,
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await validateChallengeMiddleware(req, res, next);

  expect(res.statusCode).toEqual(404);
  expect(next).not.toHaveBeenCalled();
});

test("should not validate game(can't challenge yourself)", async () => {
  const req = httpMocks.createRequest({
    jwt: {
      username: userNotPlaying1.username,
    },
    body: {
      username: userNotPlaying1.username,
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await validateChallengeMiddleware(req, res, next);

  expect(res.statusCode).toEqual(400);
  expect(next).not.toHaveBeenCalled();
});

test("should not validate game(you are playing now)", async () => {
  const req = httpMocks.createRequest({
    jwt: {
      username: user1FromGame1.username,
    },
    body: {
      username: userNotPlaying1.username,
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await validateChallengeMiddleware(req, res, next);

  expect(res.statusCode).toEqual(400);
  expect(next).not.toHaveBeenCalled();
});

test("should not validate game(enemy is playing now)", async () => {
  const req = httpMocks.createRequest({
    jwt: {
      username: userNotPlaying1.username,
    },
    body: {
      username: user1FromGame1.username,
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await validateChallengeMiddleware(req, res, next);

  expect(res.statusCode).toEqual(400);
  expect(next).not.toHaveBeenCalled();
});
