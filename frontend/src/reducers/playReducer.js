import Chess from "chess.js";

import { getUsername } from "../services/authService";

const actionTypes = {
  dataSetting: "DATA_SETTING",
  positionChange: "POSITION_CHANGE",
  loading: "LOADING",
};

const gameStates = {
  draw: "DRAW",
  whiteWin: "WHITE_WIN",
  blackWin: "BLACK_WIN",
  playing: "PLAYING",
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

    const game = new Chess(position);

    let gameState;
    if (game.in_draw()) {
      gameState = gameState.draw;
    } else if (game.in_threefold_repetition()) {
      gameState = gameState.draw;
    } else if (game.in_checkmate()) {
      gameState =
        game.turn() === "b" ? gameStates.whiteWin : gameStates.blackWin;
    } else {
      gameState = gameStates.playing;
    }

    return {
      ...state,
      enemy: enemy,
      color: color,
      position: position,
      isLoading: false,
      gameState: gameState,
    };
  }

  if (action.type === actionTypes.positionChange) {
    const position = action.value.position;
    const game = new Chess(position);

    let gameState;
    if (game.in_draw()) {
      gameState = gameState.draw;
    } else if (game.in_threefold_repetition()) {
      gameState = gameState.draw;
    } else if (game.in_checkmate()) {
      gameState =
        game.turn() === "b" ? gameStates.whiteWin : gameStates.blackWin;
    } else {
      gameState = gameStates.playing;
    }

    return { ...state, position: position, gameState: gameState };
  }

  if (action.type === actionTypes.loading) {
    return { ...state, isLoading: action.value.isLoading };
  }

  return state;
};

export { actionTypes, reducer, gameStates };
