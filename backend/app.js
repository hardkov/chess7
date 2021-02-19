const express = require("express");
const socketio = require("socket.io");
// const path = require("path");

const userRouter = require("./routes/user.js");
const gameRouter = require("./routes/game.js");

const port = process.env.PORT || 5000;
const app = express();

//tmp cors enabling
const cors = require("cors");
// const user = require("./routes/user.js");
app.use(cors());

// app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use("/user", userRouter);
app.use("/game", gameRouter);

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// const io = socketio(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     allowedHeaders: ["GET", "POST"],
//   },
// });

// const socketJWTMiddleware = (socket, next) => {
//   const { token } = socket.handshake.query;
//   if (token) {
//     try {
//       const userData = jwt.verify(token, jwtSecret);
//       socket.userData = userData;
//       return next();
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

// io.use(socketJWTMiddleware);

// io.on("connection", (socket) => {
//   console.log(game.games);
//   // let userGame = game.userGame(socket.userData.username);
//   // if(userGame){
//   //     socket.join(userGame.gameId);
//   // }

//   io.on("move", (move) => {
//     // userGame = game.userGame(socket.userData.username);
//     console.log("in move");
//     console.log(move);
//     if (userGame.playerToMove != socket.userData.username) {
//       socket.emit("moveConfirmation", "ILLEGAL_MOVE");
//       return;
//     }

//     let moveConfirmation = userGame.gameClient.move(move);

//     if (moveConfirmation == null) {
//       socket.emit("moveConfirmation", "ILLEGAL_MOVE");
//       return;
//     }

//     socket.emit("moveConfirmation", move);
//     // socket.to(userGame.gameId).emit("moveConfirmation", move);
//   });
// });
