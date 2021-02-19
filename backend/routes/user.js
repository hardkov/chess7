const express = require("express");
const bodyParser = require("body-parser");

const userController = require("../controllers/userController");
const checkCredentialsMiddleware = require("../middlewares/checkCredentialsMiddleware");
const JWTMiddleware = require("../middlewares/JWTMiddleware");

const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/register", jsonParser, userController.register);

router.post(
  "/login",
  jsonParser,
  checkCredentialsMiddleware,
  userController.login
);

router.get("/list", JWTMiddleware, userController.getUserList);

module.exports = router;
