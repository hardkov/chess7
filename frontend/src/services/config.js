import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

const LOGIN_ENDPOINT = "user/login";
const REGISTER_ENDPOINT = "user/register";
const USER_LIST_ENDPOINT = "user/list";
const CHALLANGE_ENDPOINT = "game/start";
const IS_PLAYING_ENDPOINT = "game/playing";
const GAME_LIST_ENDPOINT = "game/list";

const SOCKET_BASE_URL = "ws://localhost:5000";
const SOCKET_MOVE_ENDPOINT = SOCKET_BASE_URL + "/moves";
const SOCKET_NOTIFICATION_ENDPOINT = SOCKET_BASE_URL + "/notification";

const socketEvents = {
  move: "move",
  specialMove: "specialMove",
  gameStarted: "gameStarted",
  liveGames: "liveGames",
};

export {
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
  USER_LIST_ENDPOINT,
  CHALLANGE_ENDPOINT,
  IS_PLAYING_ENDPOINT,
  GAME_LIST_ENDPOINT,
  SOCKET_BASE_URL,
  SOCKET_MOVE_ENDPOINT,
  SOCKET_NOTIFICATION_ENDPOINT,
  socketEvents,
};
