const express = require("express");
const socketio = require("socket.io");
// const path = require("path");

const userRouter = require("./routes/user.js");
const gameRouter = require("./routes/game.js");
const socketJWTMiddleware = require("./middlewares/socketJWTMIddleware");
const dataValidationMiddleware = require("./middlewares/socketDataValidationMiddleware.js");

const port = process.env.PORT || 5000;
const app = express();

//tmp cors enabling
const cors = require("cors");
app.use(cors());

// app.use(express.static(path.join(__dirname, '../frontend/build')));
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

const { moveHandler } = require("./eventHandlers/moveHandler")(moveNamespace);
const { specialMoveHandler } = require("./eventHandlers/specialMoveHandler")(
  moveNamespace
);

moveNamespace.use(socketJWTMiddleware);
moveNamespace.use(dataValidationMiddleware);
moveNamespace.on("connection", (socket) => {
  console.log("Move channel " + socket.id);
  socket.on("move", moveHandler);
  socket.on("specialMove", specialMoveHandler);
});

io.on("connection", (socket) => {
  console.log("Main channel " + socket.id);
});
