import { useState, useEffect } from "react";

import { getUserList } from "../services/userService";
import { challengePlayer } from "../services/gameService";

const useUserList = () => {
  const [userList, setUserList] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState({ occured: false, message: "" });

  useEffect(() => {
    async function fetchData() {
      const userList = await getUserList();
      setUserList(userList);
    }

    fetchData();
  }, []);

  const challengeSelectedPlayer = async (username) => {
    const result = await challengePlayer(username);

    if (result.success) {
      setRedirect(true);
    } else {
      setError({ occured: true, message: result.error });
    }
  };

  return [
    userList,
    redirect,
    error,
    () => setError({ occured: false, message: "" }),
    challengeSelectedPlayer,
  ];
};

export default useUserList;
