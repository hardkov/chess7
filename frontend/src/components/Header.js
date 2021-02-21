import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

import { useUserContext } from "../context/userContext";
import { getUsername } from "../helpers/auth";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },

  username: {
    marginRight: 1,
  },
}));

export default function Header() {
  const { loginState } = useUserContext();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        {loginState ? (
          <Toolbar>
            <Typography className={classes.username}>
              Welcome, {getUsername()}
            </Typography>
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/play">
              Play
            </Button>
            <Button color="inherit" component={RouterLink} to="/users">
              Users
            </Button>
            <Button color="inherit" component={RouterLink} to="/logout">
              Logout
            </Button>
          </Toolbar>
        ) : (
          <Toolbar>
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Register
            </Button>
          </Toolbar>
        )}
      </AppBar>
    </div>
  );
}
