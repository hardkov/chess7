import { useState, useEffect } from "react";

import { getUserList } from "../services/userService";
import { challangePlayer } from "../services/gameService";

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

  const challangeSelectedPlayer = async (username) => {
    const result = await challangePlayer(username);

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
    challangeSelectedPlayer,
  ];
};

export default useUserList;
