import React, { useState } from "react";
import Routes from "./Routes";
import { UserContext } from "../context/userContext";
import { isLoggedIn } from "../helpers/auth";

export default function App() {
  const [loginState, setLoginState] = useState(isLoggedIn());

  return (
    <UserContext.Provider
      value={{ loginState: loginState, setLoginState: setLoginState }}
    >
      <Routes />
    </UserContext.Provider>
  );
}
