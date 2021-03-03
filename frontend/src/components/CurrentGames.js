import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Chessboard from "chessboardjsx";

const CurrentGames = () => {
  return (
    <Container component={Paper} elevation={3}>
      <Grid style={{ padding: "1vw" }} container spacing={1}>
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
    </Container>
  );
};

export default CurrentGames;
