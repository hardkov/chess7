import axios from "axios";

import { CHALLANGE_ENDPOINT, IS_PLAYING_ENDPOINT } from "./config";
import { authHeaders } from "../helpers/auth";

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
    let response = await axios.get(IS_PLAYING_ENDPOINT, {
      headers: authHeaders(),
    });

    if (response.status === 201) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export { challangePlayer, checkIfIsPlaying };
