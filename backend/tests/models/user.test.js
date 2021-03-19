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

beforeEach(() => {
  removeAll();
});

afterEach(() => {
  removeAll();
});

test("should add to and get from database", () => {
  const id1 = add(user1);
  const numberId1 = parseInt(id1);

  expect(id1).toBeDefined();
  expect(numberId1).toBeGreaterThanOrEqual(0);

  const retrievedUser1 = get(user1.username);

  expect(retrievedUser1).toBeDefined();
  expect(retrievedUser1).toEqual(user1);
});

test("should remove all from database", () => {
  add(user1);
  add(user2);
  add(user3);

  removeAll();

  allUsers = getAll();

  expect(allUsers.length).toEqual(0);
});

test("should get all from database", () => {
  add(user1);
  add(user2);
  add(user3);

  allUsers = getAll();

  expect(allUsers).toContain(user1);
  expect(allUsers).toContain(user2);
  expect(allUsers).toContain(user3);
});

test("should remove from database by id", () => {
  const id = add(user1);

  removeById(id);

  expect(get(user1.username)).not.toBeDefined();
});

test("should remove from database by username", () => {
  add(user1);

  removeByUsername(user1.username);

  expect(get(user1.username)).not.toBeDefined();
});
