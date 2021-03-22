const database = require("../../models/database");

const httpMocks = require("node-mocks-http");

const userController = require("../../controllers/userController");
const { get, removeAll, getAll } = require("../../models/user");

const username = "Joshuaaaaa";
const password = "superpassword";

database.connect();

beforeEach(async () => {
  await removeAll();
});

afterAll(async () => {
  await removeAll();
  await database.disconnect();
});

test("should register user", async () => {
  const req = httpMocks.createRequest({
    body: {
      username: username,
      password: password,
    },
  });
  const res = httpMocks.createResponse();

  await userController.register(req, res);

  const newUser = await get(username);

  expect(newUser._id).toBeDefined();
  expect(newUser.username).toBeDefined();
  expect(newUser.passwordHash).toBeDefined();

  const data = res.json()._getData();

  expect(res.statusCode).toEqual(201);
  expect(data.accessToken).toBeDefined();
  expect(data.refresherToken).toBeDefined();
});

describe("requesting access", () => {
  let id;

  beforeEach(async () => {
    const req = httpMocks.createRequest({
      body: {
        username: username,
        password: password,
      },
    });
    const res = httpMocks.createResponse();

    await userController.register(req, res);

    id = req.body.id;
  });

  test("should login user", () => {
    const req = httpMocks.createRequest({
      body: {
        id: id,
        username: username,
      },
    });
    const res = httpMocks.createResponse();

    userController.login(req, res);

    const data = res.json()._getData();

    expect(res.statusCode).toEqual(201);
    expect(data.accessToken).toBeDefined();
    expect(data.refresherToken).toBeDefined();
  });

  test("should get list of users", async () => {
    const req = httpMocks.createRequest({
      jwt: {
        username: username,
      },
    });
    const res = httpMocks.createResponse();

    await userController.getUserList(req, res);

    const data = res.json()._getData();

    expect(res.statusCode).toEqual(200);
    expect(data.userList.length).toEqual((await getAll()).length);
  });
});
