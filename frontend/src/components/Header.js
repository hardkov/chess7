import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";

import Animation from "./utils/Animation";
import {
  currentUserValue,
  currentUser,
  isLoggedIn,
} from "../services/authService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  username: {
    marginLeft: theme.spacing(3),
  },

  buttonContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
  },

  button: {
    margin: theme.spacing(2),
  },
}));

export default function Header() {
  const [user, setUser] = useState(currentUserValue());
  const classes = useStyles();
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

  const buttonLinks = accessGained ? loggedInLinks : notLoggedInLinks;
  const buttonLinkComponents = buttonLinks.map((link, idx) => (
    <Button
      key={idx}
      className={classes.button}
      variant="contained"
      color="secondary"
      component={RouterLink}
      to={link.to}
    >
      {link.name}
    </Button>
  ));

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton color="secondary" component={RouterLink} to="/">
            <HomeIcon />
          </IconButton>
          <div className={classes.buttonContainer}>
            <Animation onRender>{buttonLinkComponents}</Animation>
          </div>
          {accessGained && (
            <Typography
              color="textPrimary"
              variant="h5"
              className={classes.username}
            >
              {user.username}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
