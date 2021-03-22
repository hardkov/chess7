const express = require("express");
const socketio = require("socket.io");

require("dotenv").config();
require("./models/database").connect();
const userRouter = require("./routes/user");
const gameRouter = require("./routes/game");
const { socketEvents } = require("./handlers/helpers");
const socketJWTMiddleware = require("./middlewares/socketJWTMIddleware");
const socketUserMiddleware = require("./middlewares/socketUserMiddleware");
const socketGameMiddleware = require("./middlewares/socketGameMiddleware");

const port = process.env.PORT || 5000;
const app = express();

const cors = require("cors");
app.use(cors());

app.use("/user", userRouter);
app.use("/game", gameRouter);

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    allowedHeaders: ["GET", "POST"],
  },
});

const moveNamespace = io.of("/moves");
const notificationNamespace = io.of("/notification");

const { moveHandler } = require("./handlers/moveHandler")(moveNamespace, io);
const { specialMoveHandler } = require("./handlers/specialMoveHandler")(
  moveNamespace,
  io
);
const {
  gameNotificationHandler,
} = require("./handlers/gameNotificationHandler")(notificationNamespace, io);

moveNamespace.use(socketJWTMiddleware);
moveNamespace.use(socketUserMiddleware);
moveNamespace.use(socketGameMiddleware);
moveNamespace.on("connection", (socket) => {
  console.log("Move channel " + socket.id);
  socket.on(socketEvents.move, moveHandler);
  socket.on(socketEvents.specialMove, specialMoveHandler);
});

notificationNamespace.use(socketJWTMiddleware);
notificationNamespace.use(socketUserMiddleware);
notificationNamespace.on("connection", (socket) => {
  console.log("Notification channel " + socket.id);
  socket.on(socketEvents.gameStarted, gameNotificationHandler);
});

io.on("connection", (socket) => {
  console.log("Main channel " + socket.id);
});
