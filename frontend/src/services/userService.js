import axios from "axios";
import { io } from "socket.io-client";

import { USER_LIST_ENDPOINT, SOCKET_BASE_URL } from "./config";
import { authHeaders } from "../helpers/auth";
import { ReplaySubject } from "rxjs";

let socket;
const liveGamesSourceSubject = new ReplaySubject(1);

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

const openConnection = () => {
  socket = io.connect(SOCKET_BASE_URL);

  socket.on("liveGames", (moveData) => {
    liveGamesSourceSubject.next(moveData);
  });
};

const closeConnection = () => {
  if (socket != null) socket.close();
};
export { getUserList, openConnection, closeConnection, liveGamesSource };
