import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar, Switch, useMediaQuery } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";

import Games from "./Games";
import Users from "./Users";
import About from "./About";
import Ad from "./Ad";
import Animation from "./utils/Animation";
import ThemeChangeContext from "../context/ThemeChangeContext";
import { isLoggedIn } from "../services/authService";
import useNotification from "../hooks/useNotification";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(16),
  },

  grid: {
    marginLeft: theme.spacing(1),
  },

  buttonContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    marginTop: theme.spacing(1),
  },

  snackbar: {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default function Home() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const classes = useStyles();
  const toggle = useContext(ThemeChangeContext);
  const [gameNotification, off] = useNotification();

  return (
    <>
      <Animation onMount>
        <div className={classes.buttonContainer}>
          <Brightness4Icon />
          <Switch onClick={toggle} />
        </div>
        <div className={classes.gridContainer}>
          <Grid
            className={classes.grid}
            container
            spacing={2}
            direction={isSmallScreen ? "column" : "row"}
            justify="space-evenly"
            alignItems={isSmallScreen ? "center" : "flex-start"}
          >
            <Grid item xs={isSmallScreen ? 10 : 3}>
              {isLoggedIn() ? <Users /> : <About />}
            </Grid>
            <Grid item xs={isSmallScreen ? 10 : 5}>
              <Games />
            </Grid>
            <Grid item xs={isSmallScreen ? 10 : 3}>
              <Ad />
            </Grid>
          </Grid>
        </div>
      </Animation>
      <Snackbar
        autoHideDuration={6000}
        open={gameNotification}
        onClose={off}
        ContentProps={{
          className: classes.snackbar,
        }}
        message="You have been challanged. Go to Play section."
      />
    </>
  );
}
