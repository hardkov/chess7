import axios from "axios";
import { io } from "socket.io-client";
import { ReplaySubject } from "rxjs";

import {
  CHALLANGE_ENDPOINT,
  GAME_LIST_ENDPOINT,
  IS_PLAYING_ENDPOINT,
  SOCKET_MOVE_ENDPOINT,
  socketEvents,
} from "./config";
import { authHeaders } from "../helpers/auth";
import { getToken } from "../services/authService";
import { moveTypes } from "../helpers/chess";

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

const getGameList = async () => {
  try {
    const response = await axios.get(GAME_LIST_ENDPOINT);

    if (response.status === 200) return response.data.gameList;
  } catch (err) {
    return [];
  }
};

const positionSource = () => {
  return positionSourceSubject.asObservable();
};

const openMoveConnection = () => {
  const token = getToken();

  moveSocket = io.connect(SOCKET_MOVE_ENDPOINT, {
    auth: { token },
  });

  moveSocket.on(socketEvents.move, (moveData) => {
    positionSourceSubject.next(moveData);
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
  moveSocket.emit(socketEvents.move, move);
};

const offerDraw = () => {
  moveSocket.emit(socketEvents.specialMove, moveTypes.drawOffer);
};

const acceptDraw = () => {
  moveSocket.emit(socketEvents.specialMove, moveTypes.drawAccept);
};

const declineDraw = () => {
  moveSocket.emit(socketEvents.specialMove, moveTypes.drawDecline);
};

const surrender = () => {
  moveSocket.emit(socketEvents.specialMove, moveTypes.surrender);
};

export {
  positionSource,
  openMoveConnection,
  closeMoveConnection,
  makeMove,
  challangePlayer,
  checkIfIsPlaying,
  getGameList,
  offerDraw,
  acceptDraw,
  declineDraw,
  surrender,
};
