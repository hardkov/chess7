import React from "react";
import Grid from "@material-ui/core/Grid";
import Chessboard from "chessboardjsx";

const CurrentGames = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Chessboard width="200"></Chessboard>
        </Grid>
        <Grid item xs={4}>
          <Chessboard width="200"></Chessboard>
        </Grid>
        <Grid item xs={4}>
          <Chessboard width="200"></Chessboard>
        </Grid>
        <Grid item xs={4}>
          <Chessboard width="200"></Chessboard>
        </Grid>
        <Grid item xs={4}>
          <Chessboard width="200"></Chessboard>
        </Grid>
        <Grid item xs={4}>
          <Chessboard width="200"></Chessboard>
        </Grid>
        <Grid item xs={4}>
          <Chessboard width="200"></Chessboard>
        </Grid>
        <Grid item xs={4}>
          <Chessboard width="200"></Chessboard>
        </Grid>
      </Grid>
    </div>
  );
};

export default CurrentGames;
