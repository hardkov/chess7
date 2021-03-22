import React from "react";

import BoardMenu from "./BoardMenu";
import useGameData from "../hooks/useGameData";
import useOnDrop from "../hooks/useOnDrop";

export default function Play() {
  const [gameData, dispatch] = useGameData();
  const onDrop = useOnDrop(gameData.position, dispatch);

  return (
    <BoardMenu
      position={gameData.position}
      color={gameData.color}
      enemy={gameData.enemy}
      drawOfferedBy={gameData.drawOfferedBy}
      onDrop={onDrop}
      isLoading={gameData.isLoading}
      gameState={gameData.gameState}
    />
  );
}
