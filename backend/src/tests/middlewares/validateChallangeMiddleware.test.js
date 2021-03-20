const { Chess } = require("chess.js");
const httpMocks = require("node-mocks-http");

const validateChallangeMiddleware = require("../../middlewares/validateChallangeMiddleware");
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

afterEach(() => {
  user.removeAll();
  game.removeAll();
});

test("should validate game", () => {
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

  validateChallangeMiddleware(req, res, next);

  expect(next).toHaveBeenCalled();
});

test("should not validate game(requesting user does not exists)", () => {
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

  validateChallangeMiddleware(req, res, next);

  expect(res.statusCode).toEqual(404);
  expect(next).not.toHaveBeenCalled();
});

test("should not validate game(user to be challanged does not exist)", () => {
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

  validateChallangeMiddleware(req, res, next);

  expect(res.statusCode).toEqual(404);
  expect(next).not.toHaveBeenCalled();
});

test("should not validate game(can't challange yourself)", () => {
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

  validateChallangeMiddleware(req, res, next);

  expect(res.statusCode).toEqual(400);
  expect(next).not.toHaveBeenCalled();
});

test("should not validate game(you are playing now)", () => {
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

  validateChallangeMiddleware(req, res, next);

  expect(res.statusCode).toEqual(400);
  expect(next).not.toHaveBeenCalled();
});

test("should not validate game(enemy is playing now)", () => {
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

  validateChallangeMiddleware(req, res, next);

  expect(res.statusCode).toEqual(400);
  expect(next).not.toHaveBeenCalled();
});
