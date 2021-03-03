import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { blue, purple } from "@material-ui/core/colors";
import React from "react";
import Routes from "./Routes";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },

    secondary: {
      main: purple[500],
    },

    background: {
      paper: "#757575",
      default: "#424242",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}
