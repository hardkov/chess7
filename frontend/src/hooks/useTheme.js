import { createMuiTheme } from "@material-ui/core";
import { useState } from "react";

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

const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const [currentThemeName, setCurrentThemeName] = useState("default");

  const toggle = () => {
    if (currentThemeName == "default") {
      setCurrentTheme({ ...darkTheme });
      setCurrentThemeName("dark");
    } else {
      setCurrentTheme({ ...defaultTheme });
      setCurrentThemeName("default");
    }
  };

  return [currentTheme, toggle];
};

export default useTheme;
