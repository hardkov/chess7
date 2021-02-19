const httpMocks = require("node-mocks-http");

const vaildateJWT = require("../../middlewares/JWTMiddleware");
const { generateJWTToken } = require("../../auth/authHelpers");

test("should validate JWT", () => {
  const userData = {
    id: "0",
    username: "John",
  };

  const { token } = generateJWTToken(userData);

  let req = httpMocks.createRequest({
    headers: {
      authorization: "Bearer " + token,
    },
  });

  let res = httpMocks.createResponse();

  const next = jest.fn();

  vaildateJWT(req, res, next);

  expect(next).toHaveBeenCalledTimes(1);
  expect(req.jwt.username).toEqual(userData.username);
  expect(req.jwt.id).toEqual(userData.id);
  expect(req.jwt.refresherKey).toBeDefined();
  expect(req.jwt.iat).toBeDefined();
});

test("should not validate JWT (No header)", () => {
  const userData = {
    id: "0",
    username: "John",
  };

  let req = httpMocks.createRequest();

  let res = httpMocks.createResponse();

  const next = jest.fn();

  vaildateJWT(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(req.jwt).not.toBeDefined();
  expect(res.statusCode).toEqual(403);
});

test("should not validate JWT (invalid token format)", () => {
  const userData = {
    id: "0",
    username: "John",
  };

  const { token } = generateJWTToken(userData);

  let req = httpMocks.createRequest({
    headers: {
      authorization: "Basdeearer " + token,
    },
  });

  let res = httpMocks.createResponse();

  const next = jest.fn();

  vaildateJWT(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(req.jwt).not.toBeDefined();
  expect(res.statusCode).toEqual(401);
});

test("should not validate JWT (invalid token)", () => {
  const userData = {
    id: "0",
    username: "John",
  };

  let { token } = generateJWTToken(userData);
  const wrongChar = token.charAt(0) === "a" ? "b" : "a";
  token = wrongChar + token.substring(1);

  let req = httpMocks.createRequest({
    headers: {
      authorization: "Bearer " + token,
    },
  });

  let res = httpMocks.createResponse();

  const next = jest.fn();

  vaildateJWT(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(req.jwt).not.toBeDefined();
  expect(res.statusCode).toEqual(403);
});
