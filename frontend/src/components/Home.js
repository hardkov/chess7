import React from "react";
import Grid from "@material-ui/core/Grid";
import CurrentGames from "./CurrentGames";
import Users from "./Users";

export default function Home() {
  return (
    <div style={{ padding: "5vw" }}>
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
          <CurrentGames />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}
