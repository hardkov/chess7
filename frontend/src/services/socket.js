import { io } from "socket.io-client";

let socket;

export function openConnection() {
  //   const token = localStorage.getItem("TOKEN");
  //   if (token == null) {
  //     return;
  //   }

  socket = io.connect("ws://localhost:5000");

  // socket = io.connect('ws://localhost:5000', {
  //     query: { token }
  // });

  socket.on("connect", () => {
    socket.send("hello");
  });

  socket.on("message", (data) => {
    console.log(data);
  });
}

export const getSocket = () => {
  return socket;
};
