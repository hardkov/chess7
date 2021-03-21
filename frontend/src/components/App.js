import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React, { useEffect } from "react";
import Routes from "./Routes";

import {
  closeConnection,
  closeUserConnection,
  openConnection,
  openUserConnection,
} from "../services/userService";
import useTheme from "../hooks/useTheme";
import ThemeChangeContext from "../context/ThemeChangeContext";
import { isLoggedIn } from "../services/authService";

export default function App() {
  const [theme, toggle] = useTheme();

  useEffect(() => {
    openConnection();

    if (isLoggedIn()) openUserConnection();

    return () => {
      closeUserConnection();
      closeConnection();
    };
  }, []);

  return (
    <ThemeChangeContext.Provider value={toggle}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </ThemeChangeContext.Provider>
  );
}
