import { useState, useEffect, useRef } from "react";

import {
  currentUserValue,
  currentUser,
  isLoggedIn,
} from "../services/authService";

const useHeader = () => {
  const [user, setUser] = useState(currentUserValue());

  const subscribtionRef = useRef(null);

  useEffect(() => {
    subscribtionRef.current = currentUser().subscribe((user) => setUser(user));

    return () => {
      if (subscribtionRef.current) {
        subscribtionRef.current.unsubscribe();
      }
    };
  }, []);

  const accessGained = isLoggedIn();

  const loggedInLinks = [
    { to: "/play", name: "PLAY" },
    { to: "/logout", name: "LOGOUT" },
  ];

  const notLoggedInLinks = [
    { to: "/login", name: "LOGIN" },
    { to: "/register", name: "REGISTER" },
  ];

  const buttons = accessGained ? loggedInLinks : notLoggedInLinks;

  return [user, buttons, accessGained];
};

export default useHeader;
