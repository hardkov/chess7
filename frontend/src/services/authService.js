import axios from "axios";
import { BehaviorSubject } from "rxjs";

import { getUser, removeUser, saveUser } from "../helpers/storage";
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "./config";
import { closeUserConnection, openUserConnection } from "./userService";

const currentUserSubject = new BehaviorSubject(getUser());

const loginUser = async ({ username, password }) => {
  try {
    const response = await axios.post(LOGIN_ENDPOINT, {
      username: username,
      password: password,
    });

    if (response.status === 201) {
      const user = { username: username, token: response.data.accessToken };

      saveUser(user);
      currentUserSubject.next(user);
      openUserConnection();

      return { success: true };
    }
  } catch (error) {
    return { success: false, error: error.response.data.errors[0] };
  }
};

const registerUser = async ({ username, password }) => {
  try {
    const response = await axios.post(REGISTER_ENDPOINT, {
      username: username,
      password: password,
    });

    if (response.status === 201) {
      const user = { username: username, token: response.data.accessToken };

      saveUser(user);
      currentUserSubject.next(user);
      openUserConnection();

      return { success: true };
    }
  } catch (error) {
    return { success: false, error: error.response.data.errors[0] };
  }
};

const logoutUser = () => {
  removeUser();
  closeUserConnection();
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
