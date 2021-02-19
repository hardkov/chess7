const httpMocks = require("node-mocks-http");

const userController = require("../../controllers/userController");
const { get, removeAll, getAll } = require("../../models/user");

beforeEach(() => {
  removeAll();
});

test("should register user", () => {
  const username = "Joshua";

  const req = httpMocks.createRequest({
    body: {
      username: username,
      password: "superpassword",
    },
  });
  const res = httpMocks.createResponse();

  userController.register(req, res);

  const newUser = get(username);

  expect(newUser.id).toBeDefined();
  expect(newUser.username).toBeDefined();
  expect(newUser.passwordHash).toBeDefined();

  const data = res.json()._getData();

  expect(res.statusCode).toEqual(201);
  expect(data.accessToken).toBeDefined();
  expect(data.refresherToken).toBeDefined();
});

describe("requesting access", () => {
  const username = "Joshua";
  const password = "superpassword";
  let id;

  beforeEach(() => {
    const req = httpMocks.createRequest({
      body: {
        username: username,
        password: password,
      },
    });
    const res = httpMocks.createResponse();

    userController.register(req, res);

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

  test("should get list of users", () => {
    const req = httpMocks.createRequest({
      jwt: {
        username: username,
      },
    });
    const res = httpMocks.createResponse();

    userController.getUserList(req, res);

    const data = res.json()._getData();

    expect(res.statusCode).toEqual(200);
    expect(data.userList).toEqual(getAll());
  });
});

test;
