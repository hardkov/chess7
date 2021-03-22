import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";

import Animation from "./utils/Animation";
import useHeader from "../hooks/useHeader";

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

  iconButton: {
    color: theme.palette.primary.dark,
  },
}));

export default function Header() {
  const classes = useStyles();
  const [user, buttons, accessGained] = useHeader();

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            className={classes.iconButton}
            component={RouterLink}
            to="/"
          >
            <HomeIcon />
          </IconButton>
          <div className={classes.buttonContainer}>
            <Animation onRender>
              {buttons.map((link, idx) => (
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
              ))}
            </Animation>
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
