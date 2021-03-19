const {
  generatePasswordHash,
  validatePassword,
} = require("../../auth/authHelpers");

test("should generate and validate password", () => {
  const password1 = "example_password";

  const hash = generatePasswordHash(password1);

  expect(validatePassword(password1, hash)).toBeTruthy();
});

test("should not validate password", () => {
  const password1 = "example_password";
  const password2 = "different_password";
  const password3 = "";
  const password4 = null;
  const password5 = 5;

  const hash = generatePasswordHash(password1);

  expect(validatePassword(password2, hash)).toBeFalsy();
  expect(validatePassword(password3, hash)).toBeFalsy();
  expect(validatePassword(password4, hash)).toBeFalsy();
  expect(validatePassword(password5, hash)).toBeFalsy();
});
