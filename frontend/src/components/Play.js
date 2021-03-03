import React, { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import Grid from "@material-ui/core/Grid";
import GameChat from "./GameChat.js";
import GamePanel from "./GamePanel.js";
import { getSocket } from "../services/socket.js";
import Chess from "chess.js";

import { checkIfIsPlaying } from "../services/gameService";

export default function Play() {
  const [position, setPosition] = useState("start");
  const [game, setGame] = useState(null);

  const calcWidth = () => {
    let chessboardContainer = document.getElementById("chessboardContainer");
    let vwPixels = window.screen.width / 100;

    if (chessboardContainer != null) {
      return chessboardContainer.offsetWidth - vwPixels * 2;
    }
  };

  useEffect(() => {
    async function fetchData() {
      const isPlaying = await checkIfIsPlaying();

      if (isPlaying) {
        setGame(new Chess());
      }
    }
    fetchData();
  }, []);

  const onDrop = async ({ sourceSquare, targetSquare }) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // change this to allow user to chose promotion piece
    });

    if (move === null) {
      return;
    }

    setPosition(game.fen());

    const socket = getSocket();
    socket.emit("move", move);
  };

  if (game == null) return <div />;

  return (
    <div style={{ padding: "5vw" }}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={3}>
          <GameChat />
        </Grid>
        <Grid id="chessboardContainer" item xs={6}>
          <Chessboard
            width="300"
            position={position}
            onDrop={onDrop}
            calcWidth={calcWidth}
          />
        </Grid>
        <Grid item xs={3}>
          <GamePanel enemy="Enemy" turn="White" />
        </Grid>
      </Grid>
    </div>
  );
}
