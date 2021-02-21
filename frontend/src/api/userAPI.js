import axios from "axios";
import { getToken, setToken, setUsername } from "../helpers/auth";

const logUserIn = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:5000/user/login", {
      username: username,
      password: password,
    });

    if (response.status === 201) {
      setUsername(username);
      setToken(response.data.accessToken);
      return true;
    }
  } catch (error) {
    return false;
  }
};

const registerUser = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:5000/user/register", {
      username: username,
      password: password,
    });

    if (response.status === 201) {
      setUsername(username);
      setToken(response.data.accessToken);
      return true;
    }
  } catch (error) {
    return false;
  }
};

const getUserList = async () => {
  const token = getToken();

  try {
    const response = await axios.get("http://localhost:5000/user/list", {
      headers: { Authorization: "Bearer " + token },
    });

    if (response.status === 200) {
      return response.data.userList;
    }
  } catch (err) {
    return;
  }
};

export { logUserIn, registerUser, getUserList };
