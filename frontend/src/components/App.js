import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React, { useEffect } from "react";
import Routes from "./Routes";

import { closeConnection, openConnection } from "../services/userService";
import useTheme from "../hooks/useTheme";
import ThemeChangeContext from "../context/ThemeChangeContext";

export default function App() {
  const [theme, toggle] = useTheme();

  useEffect(() => {
    openConnection();

    return () => {
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
