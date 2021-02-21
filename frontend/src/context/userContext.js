import { useContext, createContext } from "react";

const UserContext = createContext(null);

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, useUserContext };
