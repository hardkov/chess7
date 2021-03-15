import { useEffect, useState } from "react";
import { gameStates, actionTypes } from "../helpers/chess";
import { getUsername } from "../services/authService";

const useGameMenu = (gameState, onActionClick, drawOfferedBy) => {
  const [gameStateMessage, setGameStateMessage] = useState("");
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    let buttons;
    let gameStateMessage;

    if (gameState == gameStates.playing) {
      if (drawOfferedBy != null && drawOfferedBy != getUsername()) {
        gameStateMessage = "Enemy offered a draw";
        buttons = [
          {
            text: "Surrender",
            onClick: () => onActionClick(actionTypes.surrender),
          },
          {
            text: "Accept draw",
            onClick: () => onActionClick(actionTypes.drawAccept),
          },
          {
            text: "Decline draw",
            onClick: () => onActionClick(actionTypes.drawDecline),
          },
        ];
      } else {
        buttons = [
          {
            text: "Surrender",
            onClick: () => onActionClick(actionTypes.surrender),
          },
          { text: "Draw", onClick: () => onActionClick(actionTypes.drawOffer) },
        ];
      }
    } else {
      buttons = [
        { text: "Rematch", onClick: () => onActionClick(actionTypes.rematch) },
        {
          text: "New opponent",
          onClick: () => onActionClick(actionTypes.newOpponent),
        },
      ];

      if (gameState == gameStates.whiteWin) {
        gameStateMessage = "White is Victorious";
      } else if (gameState == gameStates.blackWin) {
        gameStateMessage = "Black is Victorious";
      } else if (gameState == gameStates.draw) {
        gameStateMessage = "Draw";
      }
    }

    setButtons(buttons);
    setGameStateMessage(gameStateMessage);
  }, [gameState, drawOfferedBy]);

  return [buttons, gameStateMessage];
};

export default useGameMenu;
