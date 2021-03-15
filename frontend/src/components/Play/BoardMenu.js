import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chessboard from "chessboardjsx";
import CircularProgress from "@material-ui/core/CircularProgress";

import GamePanel from "./GamePanel";
import Animation from "../utils/Animation";
import {
  acceptDraw,
  declineDraw,
  offerDraw,
  surrender,
} from "../../services/gameService";
import {
  getGameTurn,
  calcWidth,
  gameStates,
  actionTypes,
} from "../../helpers/chess";

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
  drawOfferedBy,
  onDrop,
  isLoading,
  gameState,
}) => {
  const classes = useStyles();

  const onActionClick = (action) => {
    if (action === actionTypes.surrender) {
      surrender();
    } else if (action === actionTypes.drawOffer) {
      offerDraw();
    } else if (action === actionTypes.drawAccept) {
      acceptDraw();
    } else if (action === actionTypes.drawDecline) {
      declineDraw();
    }
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
              draggable={
                gameState === gameStates.playing &&
                color === getGameTurn(position)
              }
              onDrop={onDrop}
              calcWidth={calcWidth}
            />
          </Grid>
          <Grid item xs={3}>
            <GamePanel
              enemy={enemy}
              gameState={gameState}
              drawOfferedBy={drawOfferedBy}
              onActionClick={onActionClick}
            />
          </Grid>
        </Grid>
      </div>
    </Animation>
  );
};

export default BoardMenu;
