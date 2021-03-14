import { useEffect, useState } from "react";
import { gameStates, moveTypes } from "../helpers/chess";

const useGameMenu = (gameState, onActionClick) => {
  const [gameStateMessage, setGameStateMessage] = useState("");
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    if (gameState == gameStates.playing) {
      setButtons([
        {
          text: "Surrender",
          onClick: () => onActionClick(moveTypes.surrender),
        },
        { text: "Draw", onClick: () => onActionClick(moveTypes.drawOffer) },
      ]);

      return;
    }

    setButtons([
      { text: "Rematch", onClick: () => onActionClick("REMATCH") },
      { text: "New opponent", onClick: () => onActionClick("NEW_OPPONENT") },
    ]);

    if (gameState == gameStates.whiteWin) {
      setGameStateMessage("White is Victorious");
    } else if (gameState == gameStates.blackWin) {
      setGameStateMessage("Black is Victorious");
    } else if (gameState == gameStates.draw) {
      setGameStateMessage("Draw");
    }
  }, [gameState]);

  return [buttons, gameStateMessage];
};

export default useGameMenu;
