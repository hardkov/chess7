import { useState, useEffect, useRef } from "react";

import {
  currentUserValue,
  currentUser,
  isLoggedIn,
} from "../services/authService";
import { notificationSource } from "../services/userService";

const useHeader = () => {
  const [user, setUser] = useState(currentUserValue());
  const [gameNotification, setGameNotification] = useState(false);

  const userSubscribtionRef = useRef(null);
  const gameSubscriptionRef = useRef(null);

  useEffect(() => {
    userSubscribtionRef.current = currentUser().subscribe((user) =>
      setUser(user)
    );

    gameSubscriptionRef.current = notificationSource().subscribe((player) => {
      if (
        currentUserValue() != null &&
        currentUserValue().username === player
      ) {
        setGameNotification(true);
      }
    });

    return () => {
      if (userSubscribtionRef.current) {
        userSubscribtionRef.current.unsubscribe();
      }

      if (gameSubscriptionRef.current) {
        gameSubscriptionRef.current.unsubscribe();
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

  return [user, buttons, accessGained, gameNotification];
};

export default useHeader;
