const socketJWTMiddleware = require("../../middlewares/socketJWTMIddleware");
const { generateJWTToken } = require("../../auth/authHelpers");

const userData = {
  id: "0",
  username: "John",
};
const { token } = generateJWTToken(userData);

test("should validate connection", () => {
  const socket = {};
  socket.handshake = {};
  socket.handshake.auth = {};
  socket.handshake.auth.token = token;

  const next = jest.fn();

  socketJWTMiddleware(socket, next);

  expect(next).toHaveBeenCalledTimes(1);
  expect(next.mock.calls[0][0]).not.toBeDefined();
  expect(socket.userData).toBeDefined();
  expect(socket.userData.id).toBe(userData.id);
  expect(socket.userData.username).toBe(userData.username);
});

test("should not validate connection (no token)", () => {
  const socket = {};
  socket.handshake = {};
  socket.handshake.auth = {};

  const next = jest.fn();

  socketJWTMiddleware(socket, next);

  expect(next).toHaveBeenCalledTimes(1);
  expect(next.mock.calls[0][0]).toBeDefined();
});

test("should not validate connection (invalid token)", () => {
  const wrongChar = token.charAt(0) === "a" ? "b" : "a";
  const wrongToken = wrongChar + token.substring(1);

  const socket = {};
  socket.handshake = {};
  socket.handshake.auth = {};
  socket.handshake.auth.token = wrongToken;

  const next = jest.fn();

  socketJWTMiddleware(socket, next);

  expect(next).toHaveBeenCalledTimes(1);
  expect(next.mock.calls[0][0]).toBeDefined();
});
