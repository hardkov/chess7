import axios from "axios";
import { BehaviorSubject } from "rxjs";

import { getUser, removeUser, saveUser } from "../helpers/storage";
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "./config";

const currentUserSubject = new BehaviorSubject(getUser());

const loginUser = async (username, password) => {
  try {
    const response = await axios.post(LOGIN_ENDPOINT, {
      username: username,
      password: password,
    });

    if (response.status === 201) {
      const user = { username: username, token: response.data.accessToken };

      saveUser(user);

      currentUserSubject.next(user);

      return true;
    }
  } catch (error) {
    return false;
  }
};

const registerUser = async (username, password) => {
  try {
    const response = await axios.post(REGISTER_ENDPOINT, {
      username: username,
      password: password,
    });

    if (response.status === 201) {
      const user = { username: username, token: response.data.accessToken };

      saveUser(user);
      currentUserSubject.next(user);

      return true;
    }
  } catch (error) {
    return false;
  }
};

const logoutUser = () => {
  removeUser();
  currentUserSubject.next(null);
};

const currentUserValue = () => {
  return currentUserSubject.value;
};

const currentUser = () => {
  return currentUserSubject.asObservable();
};

const isLoggedIn = () => {
  return currentUserValue() != null;
};

const getToken = () => {
  if (isLoggedIn()) {
    return currentUserValue().token;
  }

  return null;
};

const getUsername = () => {
  if (isLoggedIn()) {
    return currentUserValue().username;
  }

  return null;
};

export {
  loginUser,
  registerUser,
  logoutUser,
  currentUserValue,
  currentUser,
  isLoggedIn,
  getToken,
  getUsername,
};
