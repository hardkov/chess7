const express = require("express");
const bodyParser = require("body-parser");

const userController = require("../controllers/userController");
const checkCredentialsMiddleware = require("../middlewares/checkCredentialsMiddleware");
const JWTMiddleware = require("../middlewares/JWTMiddleware");
const validateCredentialsMiddleware = require("../middlewares/validateCredentialsMiddleware");

const router = express.Router();
const jsonParser = bodyParser.json();

router.post(
  "/register",
  jsonParser,
  validateCredentialsMiddleware,
  userController.register
);

router.post(
  "/login",
  jsonParser,
  checkCredentialsMiddleware,
  userController.login
);

router.get("/list", JWTMiddleware, userController.getUserList);

module.exports = router;
