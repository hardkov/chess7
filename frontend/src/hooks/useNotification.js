import { useEffect, useState, useRef } from "react";

import { notificationSource } from "../services/userService";
import { currentUserValue } from "../services/authService";

const useNotification = () => {
  const [gameNotification, setGameNotification] = useState(false);
  const subscribtionRef = useRef(null);

  useEffect(() => {
    subscribtionRef.current = notificationSource().subscribe((player) => {
      if (
        currentUserValue() != null &&
        currentUserValue().username === player
      ) {
        setGameNotification(true);
      }
    });

    return () => {
      if (subscribtionRef.current) {
        subscribtionRef.current.unsubscribe();
      }
    };
  }, []);

  return [gameNotification, () => setGameNotification(false)];
};

export default useNotification;
