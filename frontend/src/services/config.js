import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

const LOGIN_ENDPOINT = "user/login";
const REGISTER_ENDPOINT = "user/register";
const USER_LIST_ENDPOINT = "user/list";
const CHALLANGE_ENDPOINT = "game/start";
const IS_PLAYING_ENDPOINT = "game/playing";

export {
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
  USER_LIST_ENDPOINT,
  CHALLANGE_ENDPOINT,
  IS_PLAYING_ENDPOINT,
};
