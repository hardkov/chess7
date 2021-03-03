import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React, { useEffect } from "react";
import Routes from "./Routes";

import { openConnection } from "../services/socket";

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#BDBDBD",
    },
    background: {
      default: "#ECE8FF",
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#4d4d49",
    },

    background: {
      paper: "#262421",
      default: "#000000",
    },
    text: {
      primary: "#BABABA",
      secondary: "#949494",
    },
  },
});
console.log(darkTheme == true);
console.log(defaultTheme == true);

export default function App() {
  useEffect(() => {
    openConnection();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}
