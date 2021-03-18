import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Chessboard from "chessboardjsx";
import useCurrentGames from "../hooks/useGames";

const CurrentGames = () => {
  const state = useCurrentGames();

  const games = state.gameList.map((game, idx) => (
    <Grid key={idx} item xs={4}>
      <Chessboard
        id={idx}
        width="200"
        draggable={false}
        position={game.position}
      />
    </Grid>
  ));

  return (
    <Container component={Paper} elevation={3}>
      <Grid style={{ padding: "1vw" }} container spacing={1}>
        {games}
      </Grid>
    </Container>
  );
};

export default CurrentGames;
