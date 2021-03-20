import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Switch } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";

import Games from "./Games";
import Users from "./Users";
import Animation from "./utils/Animation";
import ThemeChangeContext from "../context/ThemeChangeContext";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(8),
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
          container
          spacing={1}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={3}>
            <Users />
          </Grid>
          <Grid item xs={5}>
            <Games />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </div>
    </Animation>
  );
}
