const database = require("../../models/database");

const httpMocks = require("node-mocks-http");
const { Chess } = require("chess.js");

const { checkIfPlaying } = require("../../controllers/gameController");
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

  game.add({
    gameClient: new Chess(),
    whitePlayerName: user1FromGame1.username,
    blackPlayerName: user2FromGame1.username,
  });
});

afterAll(async () => {
  await user.removeAll();
  game.removeAll();

  await database.disconnect();
});

test("should response that is playing", async () => {
  const req = httpMocks.createRequest({
    jwt: {
      username: user1FromGame1.username,
    },
  });

  const res = httpMocks.createResponse();

  await checkIfPlaying(req, res);

  const data = res.json()._getData();
  const game1 = game.findGameWithPlayer(user1FromGame1.username);

  expect(res.statusCode).toEqual(201);
  expect(data.gameId).toEqual(game1.id);
  expect(data.whitePlayerName).toEqual(user1FromGame1.username);
  expect(data.blackPlayerName).toEqual(user2FromGame1.username);
});

test("should response that such user does not exist", async () => {
  const req = httpMocks.createRequest({
    jwt: {
      username: notExistingUser.username,
    },
  });

  const res = httpMocks.createResponse();

  await checkIfPlaying(req, res);

  expect(res.statusCode).toEqual(404);
});

test("should response that is not playing", async () => {
  const req = httpMocks.createRequest({
    jwt: {
      username: userNotPlaying1.username,
    },
  });

  const res = httpMocks.createResponse();

  await checkIfPlaying(req, res);

  expect(res.statusCode).toEqual(400);
});
