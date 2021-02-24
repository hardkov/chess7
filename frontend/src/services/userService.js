import axios from "axios";

import { USER_LIST_ENDPOINT } from "./config";
import { authHeaders } from "../helpers/auth";

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

export { getUserList };
