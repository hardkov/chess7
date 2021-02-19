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

beforeEach(() => {
  removeAll();
});

test("should validate credentials", () => {
  const id = add(user);

  const req = httpMocks.createRequest({
    body: {
      username: user.username,
      password: password,
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  checkCredentials(req, res, next);

  expect(next).toBeCalledTimes(1);
  expect(req.body.id).toEqual(id);
  expect(req.body.username).toEqual(user.username);
});

test("should not validate credentials(requesting user does not exists)", () => {
  const password = "superpassword";
  const passwordHash = generatePasswordHash(password);
  const user = {
    username: "Adrian",
    passwordHash,
  };

  const req = httpMocks.createRequest({
    body: {
      username: user.username,
      password: password,
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  checkCredentials(req, res, next);

  expect(next).not.toBeCalled();
  expect(req.body.id).not.toBeDefined();
  expect(res.statusCode).toEqual(404);
});

test("should not validate credentials(wrong password)", () => {
  const password = "superpassword";
  const passwordHash = generatePasswordHash(password);
  const user = {
    username: "Adrian",
    passwordHash,
  };
  const id = add(user);

  const req = httpMocks.createRequest({
    body: {
      username: user.username,
      password: password + "a",
    },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  checkCredentials(req, res, next);

  expect(next).not.toBeCalled();
  expect(req.body.id).not.toBeDefined();
  expect(res.statusCode).toEqual(400);
});
