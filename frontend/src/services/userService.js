import axios from "axios";
import { io } from "socket.io-client";

import { USER_LIST_ENDPOINT } from "./config";
import { authHeaders } from "../helpers/auth";

let socket;

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

const openConnection = () => {
  socket = io.connect("ws://localhost:5000");
};

const closeConnection = () => {
  if (socket != null) {
    socket.close();
  }
};
export { getUserList, openConnection, closeConnection };
