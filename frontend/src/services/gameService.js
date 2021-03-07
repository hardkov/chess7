import axios from "axios";
import { io } from "socket.io-client";
import { ReplaySubject } from "rxjs";

import { CHALLANGE_ENDPOINT, IS_PLAYING_ENDPOINT } from "./config";
import { authHeaders } from "../helpers/auth";
import { getToken } from "../services/authService";

let moveSocket;
const positionSourceSubject = new ReplaySubject(1);

const challangePlayer = async (username) => {
  try {
    const response = await axios.post(
      CHALLANGE_ENDPOINT,
      { username: username },
      { headers: authHeaders() }
    );

    if (response.status === 201) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

const checkIfIsPlaying = async () => {
  try {
    const response = await axios.get(IS_PLAYING_ENDPOINT, {
      headers: authHeaders(),
    });

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    return;
  }
};

const positionSource = () => {
  return positionSourceSubject.asObservable();
};

const openMoveConnection = () => {
  const token = getToken();

  moveSocket = io.connect("ws://localhost:5000/moves", {
    auth: { token },
  });

  moveSocket.on("move", (data) => {
    positionSourceSubject.next(data);
  });

  moveSocket.on("connect_error", (err) => {
    console.log(err.message);
  });

  moveSocket.on("disconnect", () => {
    console.log("Move socket disconnected");
  });
};

const closeMoveConnection = () => {
  if (moveSocket != null) {
    moveSocket.close();
  }
};

const makeMove = (move) => {
  moveSocket.emit("move", move);
};

export {
  positionSource,
  openMoveConnection,
  closeMoveConnection,
  makeMove,
  challangePlayer,
  checkIfIsPlaying,
};
