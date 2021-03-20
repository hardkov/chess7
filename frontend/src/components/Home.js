import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Switch } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";

import Games from "./Games";
import Users from "./Users";
import About from "./About";
import Ad from "./Ad";
import Animation from "./utils/Animation";
import ThemeChangeContext from "../context/ThemeChangeContext";
import { isLoggedIn } from "../services/authService";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(8),
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
}));

export default function Home() {
  const classes = useStyles();
  const toggle = useContext(ThemeChangeContext);

  return (
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
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid item xs={3}>
            {isLoggedIn() ? <Users /> : <About />}
          </Grid>
          <Grid item xs={5}>
            <Games />
          </Grid>
          <Grid item xs={3}>
            <Ad />
          </Grid>
        </Grid>
      </div>
    </Animation>
  );
}
