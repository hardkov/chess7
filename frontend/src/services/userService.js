import axios from "axios";
import { io } from "socket.io-client";
import { Subject } from "rxjs";

import {
  USER_LIST_ENDPOINT,
  SOCKET_BASE_URL,
  SOCKET_NOTIFICATION_ENDPOINT,
  socketEvents,
} from "./config";
import { getToken } from "../services/authService";
import { authHeaders } from "../helpers/auth";

let socket;
const liveGamesSourceSubject = new Subject();

let userSocket;
const notificationSourceSubject = new Subject();

const getUserList = async () => {
  try {
    const response = await axios.get(USER_LIST_ENDPOINT, {
      headers: authHeaders(),
    });

    if (response.status === 200) {
      return response.data.userList;
    }
  } catch (err) {
    return;
  }
};

const liveGamesSource = () => {
  return liveGamesSourceSubject.asObservable();
};

const notificationSource = () => {
  return notificationSourceSubject.asObservable();
};

const openUserConnection = () => {
  const token = getToken();

  userSocket = io.connect(SOCKET_NOTIFICATION_ENDPOINT, {
    auth: { token },
  });

  userSocket.on(socketEvents.gameStarted, (data) => {
    notificationSourceSubject.next(data);
  });

  userSocket.on("connect_error", (err) => {
    console.log(err.message);
  });

  userSocket.on("disconnect", () => {
    console.log("User socket disconnected");
  });
};

const closeUserConnection = () => {
  if (userSocket != null) userSocket.close();
};

const notifyAboutGame = (enemy) => {
  userSocket.emit(socketEvents.gameStarted, enemy);
};

const openConnection = () => {
  socket = io.connect(SOCKET_BASE_URL);

  socket.on(socketEvents.liveGames, (moveData) => {
    liveGamesSourceSubject.next(moveData);
  });

  socket.on("disconnect", () => {
    console.log("Main socket disconnected");
  });
};

const closeConnection = () => {
  if (socket != null) socket.close();
};
export {
  getUserList,
  notificationSource,
  openUserConnection,
  closeUserConnection,
  notifyAboutGame,
  openConnection,
  closeConnection,
  liveGamesSource,
};
