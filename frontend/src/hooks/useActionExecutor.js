import { useState } from "react";

import {
  acceptDraw,
  challengePlayer,
  declineDraw,
  offerDraw,
  surrender,
} from "../services/gameService";
import { actionTypes } from "../helpers/chess";

const useActionExecutor = (enemy) => {
  const [redirect, setRedirect] = useState(null);

  const onActionClick = async (action) => {
    if (action === actionTypes.surrender) {
      surrender();
    } else if (action === actionTypes.drawOffer) {
      offerDraw();
    } else if (action === actionTypes.drawAccept) {
      acceptDraw();
    } else if (action === actionTypes.drawDecline) {
      declineDraw();
    } else if (action === actionTypes.newOpponent) {
      setRedirect("/");
    } else if (action === actionTypes.rematch) {
      const isChallenged = await challengePlayer(enemy);

      if (isChallenged) {
        setRedirect("/");
      }
    }
  };

  return [redirect, onActionClick];
};

export { useActionExecutor };
