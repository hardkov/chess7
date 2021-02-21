import axios from "axios";

const challangePlayer = async (username) => {
  const token = localStorage.getItem("TOKEN");

  try {
    const response = await axios.post(
      "http://localhost:5000/game/start",
      { username: username },
      { headers: { Authorization: "Bearer " + token } }
    );

    if (response.status === 201) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

const checkIfIsPlaying = async () => {
  const token = localStorage.getItem("TOKEN");

  try {
    let response = await axios.get("http://localhost:5000/game/playing", {
      headers: { Authorization: "Bearer " + token },
    });

    if (response.status === 201) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export { challangePlayer, checkIfIsPlaying };
