import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";

// import ButtonGroup from "@material-ui/core/ButtonGroup";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

import {
  currentUser,
  isLoggedIn,
  currentUserValue,
} from "../services/authService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  username: {
    marginLeft: theme.spacing(3),
  },

  buttonWrapper: {
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

  useEffect(() => {
    currentUser().subscribe((u) => setUser(u));
  });

  const accessGained = isLoggedIn();

  const loggedInLinks = [
    { to: "/play", name: "PLAY" },
    { to: "/users", name: "USERS" },
    { to: "/logout", name: "LOGOUT" },
  ];

  const notLoggedInLinks = [
    { to: "/login", name: "LOGIN" },
    { to: "/register", name: "REGISTER" },
  ];

  const buttonLinks = accessGained ? loggedInLinks : notLoggedInLinks;

  const buttonLinksComponents = buttonLinks.map((link, idx) => (
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
            <HomeIcon fontSize="large" />
          </IconButton>
          <div className={classes.buttonWrapper}>{buttonLinksComponents}</div>
          {accessGained && (
            <Typography
              color="textSecondary"
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
