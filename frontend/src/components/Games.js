import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chessboard from "chessboardjsx";
import useGames from "../hooks/useGames";

const Games = () => {
  const state = useGames();

  const games = state.gameList.map((game) => (
    <Grid key={game.id} item>
      <Chessboard
        key={game.id}
        id={game.id}
        width="200"
        draggable={false}
        position={game.position}
      />
    </Grid>
  ));

  return (
    <Container component={Paper} elevation={3}>
      <Typography variant="overline" color="textPrimary">
        <Box fontWeight="fontWeightBold">Live Games</Box>
      </Typography>
      <Grid
        container
        justify="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        {games}
      </Grid>
      <br />
    </Container>
  );
};

export default Games;
