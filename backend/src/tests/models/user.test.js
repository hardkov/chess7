const database = require("../../models/database");

const {
  add,
  get,
  getAll,
  removeAll,
  removeById,
  removeByUsername,
} = require("../../models/user");

const user1 = {
  username: "John",
  passwordHash: "jasdlkasjdkjlaj",
};

const user2 = {
  username: "Adam",
  passwordHash: "jasdlkasjdkjlaj",
};

const user3 = {
  username: "Mike",
  passwordHash: "jasdlkasjdkjlaj",
};

database.connect();

beforeAll(async () => {
  await removeAll();
});

afterEach(async () => {
  await removeAll();
});

afterAll(async () => {
  await database.disconnect();
});

test("should add to and get from database", async () => {
  const id1 = await add(user1);

  expect(id1).toBeDefined();

  const retrievedUser1 = await get(user1.username);

  expect(retrievedUser1).toBeDefined();
  expect(retrievedUser1._id.toString()).toEqual(id1);
  expect(retrievedUser1.username).toEqual(user1.username);
});

test("should remove all from database", async () => {
  await add(user1);
  await add(user2);
  await add(user3);

  await removeAll();

  const allUsers = await getAll();

  expect(allUsers.length).toEqual(0);
});

test("should get all from database", async () => {
  await add(user1);
  await add(user2);
  await add(user3);

  const allUsers = await getAll();

  expect(allUsers.length).toEqual(3);
});

test("should remove from database by id", async () => {
  const id = await add(user1);

  await removeById(id);

  const retrievedUser1 = await get(user1.username);

  expect(retrievedUser1).toBeNull();
});

test("should remove from database by username", async () => {
  await add(user1);

  await removeByUsername(user1.username);

  const retrievedUser1 = await get(user1.username);

  expect(retrievedUser1).toBeNull();
});
