const { Chess } = require("chess.js");

const {
  add,
  get,
  findGameWithPlayer,
  getAll,
  removeGame,
  removeAll,
} = require("../../models/game");

const game1 = {
  gameClient: new Chess(),
  whitePlayerName: "Ben",
  blackPlayerName: "Samuel",
};

const game2 = {
  gameClient: new Chess(),
  whitePlayerName: "Andy",
  blackPlayerName: "Susan",
};

const game3 = {
  gameClient: new Chess(),
  whitePlayerName: "Whitney",
  blackPlayerName: "Daniel",
};

beforeEach(() => {
  removeAll();
});

afterEach(() => {
  removeAll();
});

test("should add to and get from database", () => {
  const id1 = add(game1);
  const numberId1 = parseInt(id1);

  expect(id1).toBeDefined();
  expect(numberId1).toBeGreaterThanOrEqual(0);

  const retrievedGame1 = get(id1);

  expect(retrievedGame1).toBeDefined();
  expect(game1).toEqual(retrievedGame1);
});

test("should find a game with a player in database", () => {
  add(game1);

  const retrievedGame1 = findGameWithPlayer(game1.whitePlayerName);
  const retrievedGame2 = findGameWithPlayer(game1.blackPlayerName);

  expect(retrievedGame1).toEqual(game1);
  expect(retrievedGame2).toEqual(game1);
});

test("should get all games from database", () => {
  add(game1);
  add(game2);
  add(game3);

  const games = getAll();

  expect(games).toContain(game1);
  expect(games).toContain(game2);
  expect(games).toContain(game3);
});

test("should remove a game from database", () => {
  add(game1);

  removeGame(game1.id);

  expect(get(game1.id)).not.toBeDefined();
});

test("should remove all games from database", () => {
  add(game1);
  add(game2);
  add(game3);

  removeAll();

  expect(getAll().length).toEqual(0);
});
