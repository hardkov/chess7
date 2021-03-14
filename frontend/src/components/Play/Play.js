import React from "react";

import BoardMenu from "./BoardMenu";
import useGameData from "../../hooks/useGameData.js";
import useOnDrop from "../../hooks/useOnDrop";

export default function Play() {
  const [gameData, dispatch] = useGameData();
  const onDrop = useOnDrop(gameData.position, dispatch);

  return (
    <BoardMenu
      position={gameData.position}
      color={gameData.color}
      enemy={gameData.enemy}
      onDrop={onDrop}
      isLoading={gameData.isLoading}
      gameState={gameData.gameState}
    />
  );
}
