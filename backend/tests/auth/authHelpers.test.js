const {
  generatePasswordHash,
  validatePassword,
} = require("../../auth/authHelpers");

test("should generate and validate password", () => {
  const password1 = "example_password";

  const hash = generatePasswordHash(password1);

  expect(validatePassword(password1, hash)).toBeTruthy();
});
