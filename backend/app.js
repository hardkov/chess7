const express = require("express");
const socketio = require("socket.io");
// const path = require("path");

const userRouter = require("./routes/user.js");
const gameRouter = require("./routes/game.js");
const socketJWTMiddleware = require("./middlewares/socketJWTMIddleware");
const dataValidationMiddleware = require("./middlewares/socketDataValidationMiddleware.js");
const moveHandler = require("./eventHandlers/moveHandler");

const port = process.env.PORT || 5000;
const app = express();

//tmp cors enabling
const cors = require("cors");
const { findGameWithPlayer } = require("./models/game");
// const user = require("./routes/user.js");
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

io.of("/moves").use(socketJWTMiddleware);
io.of("/moves").use(dataValidationMiddleware);
io.of("/moves").on("connection", (socket) => {
  socket.on("move", moveHandler);
});
