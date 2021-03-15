import { useState, useEffect } from "react";
import { getUserList } from "../services/userService";
import { challangePlayer } from "../services/gameService";

const useUserList = () => {
  const [userList, setUserList] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const userList = await getUserList();
      setUserList(userList);
    }

    fetchData();
  }, []);

  const challangeSelectedPlayer = async (username) => {
    const isChallanged = await challangePlayer(username);

    if (isChallanged) {
      setRedirect(true);
    }
  };

  return [userList, redirect, challangeSelectedPlayer];
};

export default useUserList;
