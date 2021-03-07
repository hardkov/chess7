import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chessboard from "chessboardjsx";
import CircularProgress from "@material-ui/core/CircularProgress";

import GamePanel from "../GamePanel";
import Animation from "../utils/Animation";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
  },

  progress: {
    marginLeft: "50%",
  },
}));

const BoardMenu = ({
  position,
  color,
  enemy,
  onDrop,
  isLoading,
  gameState,
}) => {
  const classes = useStyles();

  const calcWidth = () => {
    const chessboardContainer = document.getElementById("chessboardContainer");
    const vwPixels = window.screen.width / 100;

    if (chessboardContainer != null) {
      const dynamicWidth = chessboardContainer.offsetWidth - vwPixels * 2;

      return Math.min(dynamicWidth, 720);
    }
  };

  const onSurrenderClick = () => {
    console.log("Surrender click");
  };

  const onRematchClick = () => {
    console.log("Rematch click");
  };

  const onNewOpponentClick = () => {
    console.log("New opponent click");
  };

  const onDrawClick = () => {
    console.log("Draw click");
  };

  if (isLoading) return <CircularProgress className={classes.progress} />;

  if (position == null || color == null || enemy == null || gameState == null)
    return <div />;

  return (
    <Animation onMount>
      <div className={classes.paper}>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="stretch"
        >
          <Grid item xs={3}></Grid>
          <Grid item id="chessboardContainer" xs={6}>
            <Chessboard
              position={position}
              orientation={color}
              onDrop={onDrop}
              calcWidth={calcWidth}
            />
          </Grid>
          <Grid item xs={3}>
            <GamePanel
              enemy={enemy}
              gameState={gameState}
              onSurrenderClick={onSurrenderClick}
              onDrawClick={onDrawClick}
              onRematchClick={onRematchClick}
              onNewOpponentClick={onNewOpponentClick}
            />
          </Grid>
        </Grid>
      </div>
    </Animation>
  );
};

export default BoardMenu;
