import { useEffect, useState } from "react";
import { gameStates, actionTypes } from "../helpers/chess";
import { getUsername } from "../services/authService";

const useGameMenu = (gameState, onActionClick, drawOfferedBy) => {
  const [gameStateMessage, setGameStateMessage] = useState("");
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    let buttons = [
      {
        text: "Surrender",
        onClick: () => onActionClick(actionTypes.surrender),
      },
    ];
    let gameStateMessage;

    if (gameState == gameStates.playing) {
      if (drawOfferedBy == null) {
        buttons.push({
          text: "Draw",
          onClick: () => onActionClick(actionTypes.drawOffer),
        });
      } else if (drawOfferedBy != getUsername()) {
        gameStateMessage = "Enemy offered a draw";
        buttons.push(
          {
            text: "Accept draw",
            onClick: () => onActionClick(actionTypes.drawAccept),
          },
          {
            text: "Decline draw",
            onClick: () => onActionClick(actionTypes.drawDecline),
          }
        );
      } else {
        gameStateMessage = "You offered a draw";
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
