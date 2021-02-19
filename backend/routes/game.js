const express = require("express");
const bodyParser = require("body-parser");

const gameController = require("../controllers/gameController");
const JWTMiddleware = require("../middlewares/JWTMiddleware");

const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/start", JWTMiddleware, jsonParser, gameController.startGame);

router.get(
  "/playing",
  JWTMiddleware,
  jsonParser,
  gameController.checkIfPlaying
);

module.exports = router;
