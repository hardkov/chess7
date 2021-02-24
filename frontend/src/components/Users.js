import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";

import { getUserList } from "../services/userService";
import { challangePlayer } from "../services/gameService";

export default function Users() {
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

  if (redirect) {
    return <Redirect to="/play" />;
  }

  if (userList == null) return <div />;

  const rows = userList.map((user) => {
    return (
      <tr key={user.id}>
        <th>{user.username}</th>
        <td>
          <Button
            size="small"
            orientation="vertical"
            color="primary"
            aria-label="vertical outlined primary button group"
            variant="contained"
            onClick={() => challangeSelectedPlayer(user.username)}
          >
            Challange
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th> Users </th>
          </tr>
          {rows}
        </tbody>
      </table>
    </div>
  );
}
