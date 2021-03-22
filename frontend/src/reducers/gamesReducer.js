const actionTypes = {
  updateGame: "UPDATE_GAME",
  setGames: "SET_GAMES",
};

const reducer = (state, action) => {
  if (action.type === actionTypes.updateGame) {
    const position = action.value.currentPosition;
    const id = action.value.id;
    const game = state.gameList.find((game) => game.id === id);

    if (game) {
      if (position) {
        game.position = position;
      } else {
        state.gameList = state.gameList.filter((game) => game.id !== id);
      }

      return { ...state };
    }

    if (position) {
      state.gameList.push({
        id: action.value.id,
        position: position,
      });

      return { ...state };
    }
  } else if (action.type === actionTypes.setGames) {
    return { ...state, gameList: action.value.gameList };
  }

  return state;
};

export { actionTypes, reducer };
