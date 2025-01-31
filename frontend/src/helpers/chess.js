import Chess from "chess.js";

const gameStates = {
  draw: "DRAW",
  whiteWin: "WHITE_WIN",
  blackWin: "BLACK_WIN",
  playing: "PLAYING",
};

const moveTypes = {
  drawOffer: "DRAW_OFFER",
  drawAccept: "DRAW_ACCEPT",
  drawDecline: "DRAW_DECLINE",
  surrender: "SURRENDER",
  special: "SPECIAL",
  normal: "NORMAL",
};

const actionTypes = {
  drawOffer: "DRAW_OFFER",
  drawAccept: "DRAW_ACCEPT",
  drawDecline: "DRAW_DECLINE",
  surrender: "SURRENDER",
  rematch: "REMATCH",
  newOpponent: "NEW_OPPONENT",
};

const validateMove = (sourceSquare, targetSquare, position) => {
  const game = new Chess(position);
  const move = game.move({
    from: sourceSquare,
    to: targetSquare,
    promotion: "q", // change this to allow user to chose promotion piece
  });

  if (move == null) return {};

  return { move: move, newPosition: game.fen() };
};

const getGameState = (position) => {
  const game = new Chess(position);

  if (game.in_draw()) {
    return gameStates.draw;
  } else if (game.in_threefold_repetition()) {
    return gameStates.draw;
  } else if (game.in_checkmate()) {
    return game.turn() === "b" ? gameStates.whiteWin : gameStates.blackWin;
  }

  return gameStates.playing;
};

const getGameTurn = (position) => {
  const game = new Chess(position);

  const turn = game.turn() === "w" ? "white" : "black";

  return turn;
};

const calcWidth = (id, maxWidth) => {
  const chessboardContainer = document.getElementById(id);
  const vwPixels = window.screen.width / 100;

  if (chessboardContainer != null) {
    const dynamicWidth = chessboardContainer.offsetWidth - vwPixels * 2;

    return Math.min(dynamicWidth, maxWidth);
  }
};

export {
  gameStates,
  moveTypes,
  actionTypes,
  validateMove,
  getGameState,
  getGameTurn,
  calcWidth,
};
