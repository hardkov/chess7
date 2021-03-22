const database = require("../../models/database");

const validateCredentialsMiddleware = require("../../middlewares/validateCredentialsMiddleware");
const httpMocks = require("node-mocks-http");

database.connect();

afterAll(async () => {
  await database.disconnect();
});
test("should validate credentials", async () => {
  const username = "aaaaaaaa";
  const password = "bbbbbbbb";

  const req = httpMocks.createRequest({
    body: {
      username,
      password,
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await validateCredentialsMiddleware(req, res, next);

  expect(next).toBeCalledTimes(1);
});

test("should not validate credentials (too short username)", async () => {
  const username = "aaaa";
  const password = "bbbbbbbb";

  const req = httpMocks.createRequest({
    body: {
      username,
      password,
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await validateCredentialsMiddleware(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(res.statusCode).toEqual(400);
});

test("should not validate credentials (too short password)", async () => {
  const username = "bbbbbbbb";
  const password = "aaaa";

  const req = httpMocks.createRequest({
    body: {
      username,
      password,
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await validateCredentialsMiddleware(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(res.statusCode).toEqual(400);
});

test("should not validate credentials (no username)", async () => {
  const password = "bbbbbbbb";

  const req = httpMocks.createRequest({
    body: {
      password,
    },
  });
  const next = jest.fn();
  const res = httpMocks.createResponse();

  await validateCredentialsMiddleware(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(res.statusCode).toEqual(400);
});

test("should not validate credentials (no password)", async () => {
  const username = "bbbbbbbb";

  const req = httpMocks.createRequest({
    body: {
      username,
    },
  });
  const next = jest.fn();
  const res = httpMocks.createResponse();

  await validateCredentialsMiddleware(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(res.statusCode).toEqual(400);
});

test("should not validate credentials (invalid credentials types)", async () => {
  const username = 6;
  const password = 5;

  const req = httpMocks.createRequest({
    body: {
      username,
      password,
    },
  });

  const next = jest.fn();
  const res = httpMocks.createResponse();

  await validateCredentialsMiddleware(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(res.statusCode).toEqual(400);
});
