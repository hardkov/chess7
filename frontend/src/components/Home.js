import React from "react";
import Grid from "@material-ui/core/Grid";

import Games from "./Games";
import Users from "./Users";
import Animation from "./utils/Animation";

export default function Home() {
  return (
    <Animation onMount>
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
            <Games />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </div>
    </Animation>
  );
}
