import { gameStates, getGameState, moveTypes } from "../helpers/chess";
import { getUsername } from "../services/authService";

const actionTypes = {
  dataSetting: "DATA_SETTING",
  positionChange: "POSITION_CHANGE",
  loading: "LOADING",
};

const reducer = (state, action) => {
  if (action.type === actionTypes.dataSetting) {
    const gameData = action.value.gameData;
    const currentUserUsername = getUsername();

    const enemy =
      currentUserUsername === gameData.whitePlayerName
        ? gameData.blackPlayerName
        : gameData.whitePlayerName;

    const color =
      currentUserUsername === gameData.whitePlayerName ? "white" : "black";

    const position = gameData.fen;

    const gameState = getGameState(position);

    return {
      ...state,
      enemy: enemy,
      color: color,
      position: position,
      isLoading: false,
      gameState: gameState,
      drawOfferedBy: gameData.drawOfferedBy,
    };
  }

  if (action.type === actionTypes.positionChange) {
    const moveData = action.value.moveData;

    if (moveData.type === moveTypes.normal) {
      const position = moveData.currentPosition;

      const gameState = getGameState(moveData.currentPosition);

      return { ...state, position: position, gameState: gameState };
    } else if (moveData.type === moveTypes.special) {
      const { move } = moveData;

      if (move === moveTypes.surrender) {
        const gameState =
          moveData.winner === "white"
            ? gameStates.whiteWin
            : gameStates.blackWin;

        return { ...state, gameState: gameState };
      } else if (move === moveTypes.drawOffer) {
        return { ...state, drawOfferedBy: moveData.sender };
      } else if (move === moveTypes.drawAccept) {
        return { ...state, gameState: gameStates.draw };
      } else if (move === moveTypes.drawDecline) {
        return { ...state, drawOfferedBy: null };
      }
    }
  }

  if (action.type === actionTypes.loading) {
    return { ...state, isLoading: action.value.isLoading };
  }

  return state;
};

export { actionTypes, reducer };
