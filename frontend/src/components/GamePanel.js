import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { currentUserValue } from "../services/authService";
import { gameStates } from "../reducers/playReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
    height: "100%",
  },
}));

export default function GamePanel({
  enemy,
  gameState,
  onSurrenderClick,
  onDrawClick,
  onRematchClick,
  onNewOpponentClick,
}) {
  const classes = useStyles();
  const [gameStateMessage, setGameStateMessage] = useState("");
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    if (gameState == gameStates.playing) {
      setButtons([
        { text: "Surrender", onClick: onSurrenderClick },
        { text: "Draw", onClick: onDrawClick },
      ]);
    } else {
      setButtons([
        { text: "Rematch", onClick: onRematchClick },
        { text: "New opponent", onClick: onNewOpponentClick },
      ]);
      if (gameState == gameStates.whiteWin) {
        setGameStateMessage("White is Victorious");
      } else if (gameState == gameStates.blackWin) {
        setGameStateMessage("Black is Victorious");
      } else if (gameState == gameStates.draw) {
        setGameStateMessage("Draw");
      }
    }
  }, [gameState]);

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        alignItems="flex-start"
        direction="column"
      >
        <Grid item>
          <Typography color="textSecondary" variant="h6">
            {enemy}
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="textPrimary">{gameStateMessage}</Typography>
          <ButtonGroup
            fullWidth={true}
            size="large"
            orientation="vertical"
            color="primary"
            variant="contained"
          >
            {buttons.map(({ text, onClick }, idx) => (
              <Button key={idx} onClick={() => onClick}>
                {text}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid item>
          <Typography color="textSecondary" variant="h6">
            {currentUserValue().username}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
