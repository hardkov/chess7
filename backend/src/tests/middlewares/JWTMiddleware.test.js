const httpMocks = require("node-mocks-http");

const vaildateJWT = require("../../middlewares/JWTMiddleware");
const { generateJWTToken } = require("../../auth/authHelpers");

const userData = {
  id: "0",
  username: "John",
};

const { token } = generateJWTToken(userData);

test("should validate JWT", () => {
  const req = httpMocks.createRequest({
    headers: {
      authorization: "Bearer " + token,
    },
  });

  const res = httpMocks.createResponse();

  const next = jest.fn();

  vaildateJWT(req, res, next);

  expect(next).toHaveBeenCalledTimes(1);
  expect(req.jwt.username).toEqual(userData.username);
  expect(req.jwt.id).toEqual(userData.id);
  expect(req.jwt.refresherKey).toBeDefined();
  expect(req.jwt.iat).toBeDefined();
});

test("should not validate JWT (no header)", () => {
  const req = httpMocks.createRequest();

  const res = httpMocks.createResponse();

  const next = jest.fn();

  vaildateJWT(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(req.jwt).not.toBeDefined();
  expect(res.statusCode).toEqual(403);
});

test("should not validate JWT (invalid token format)", () => {
  let req = httpMocks.createRequest({
    headers: {
      authorization: "Basdeearer " + token,
    },
  });

  const res = httpMocks.createResponse();

  const next = jest.fn();

  vaildateJWT(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(req.jwt).not.toBeDefined();
  expect(res.statusCode).toEqual(401);
});

test("should not validate JWT (invalid token)", () => {
  const wrongChar = token.charAt(0) === "a" ? "b" : "a";
  const wrontToken = wrongChar + token.substring(1);

  const req = httpMocks.createRequest({
    headers: {
      authorization: "Bearer " + wrontToken,
    },
  });

  const res = httpMocks.createResponse();

  const next = jest.fn();

  vaildateJWT(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(req.jwt).not.toBeDefined();
  expect(res.statusCode).toEqual(403);
});

test("should not validate JWT (empty token)", () => {
  const req = httpMocks.createRequest({
    headers: {
      authorization: "Bearer ",
    },
  });

  const res = httpMocks.createResponse();

  const next = jest.fn();

  vaildateJWT(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(req.jwt).not.toBeDefined();
  expect(res.statusCode).toEqual(403);
});
