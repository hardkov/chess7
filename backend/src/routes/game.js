const express = require("express");
const bodyParser = require("body-parser");

const gameController = require("../controllers/gameController");
const JWTMiddleware = require("../middlewares/JWTMiddleware");
const validateChallengeMiddleware = require("../middlewares/validateChallengeMiddleware");

const router = express.Router();
const jsonParser = bodyParser.json();

router.post(
  "/start",
  JWTMiddleware,
  jsonParser,
  validateChallengeMiddleware,
  gameController.startGame
);

router.get("/playing", JWTMiddleware, gameController.checkIfPlaying);

router.get("/list", gameController.getGameList);

module.exports = router;
