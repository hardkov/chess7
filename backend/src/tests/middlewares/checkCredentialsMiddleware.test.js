const database = require("../../models/database");
const httpMocks = require("node-mocks-http");

const { add, removeAll } = require("../../models/user");
const checkCredentials = require("../../middlewares/checkCredentialsMiddleware");
const { generatePasswordHash } = require("../../auth/authHelpers");

const password = "superpassword";
const passwordHash = generatePasswordHash(password);
const user = {
  username: "Johnny",
  passwordHash,
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

test("should validate credentials", async () => {
  const id = await add(user);

  const req = httpMocks.createRequest({
    body: {
      username: user.username,
      password,
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await checkCredentials(req, res, next);

  expect(next).toBeCalledTimes(1);
  expect(req.body.id).toEqual(id);
  expect(req.body.username).toEqual(user.username);
});

test("should not validate credentials(requesting user does not exists)", async () => {
  const req = httpMocks.createRequest({
    body: {
      username: user.username,
      password,
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await checkCredentials(req, res, next);

  expect(next).not.toBeCalled();
  expect(req.body.id).not.toBeDefined();
  expect(res.statusCode).toEqual(404);
});

test("should not validate credentials(wrong password)", async () => {
  await add(user);

  const req = httpMocks.createRequest({
    body: {
      username: user.username,
      password: password + "a",
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await checkCredentials(req, res, next);

  expect(next).not.toBeCalled();
  expect(req.body.id).not.toBeDefined();
  expect(res.statusCode).toEqual(400);
});

test("should not validate credentials(no password)", async () => {
  await add(user);

  const req = httpMocks.createRequest({
    body: {
      username: user.username,
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await checkCredentials(req, res, next);

  expect(next).not.toBeCalled();
  expect(req.body.id).not.toBeDefined();
  expect(res.statusCode).toEqual(400);
});

test("should not validate credentials(no username)", async () => {
  await add(user);

  const req = httpMocks.createRequest({
    body: {
      password,
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await checkCredentials(req, res, next);

  expect(next).not.toBeCalled();
  expect(req.body.id).not.toBeDefined();
  expect(res.statusCode).toEqual(404);
});
