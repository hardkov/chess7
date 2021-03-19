const actionTypes = {
  updateGame: "UPDATE_GAME",
  setGames: "SET_GAMES",
};

const reducer = (state, action) => {
  if (action.type === actionTypes.updateGame) {
    for (let idx = 0; idx < state.gameList.length; idx++) {
      const game = state.gameList[length];

      if (game.id === action.value.id) {
        if (action.value.currentPosition == null) {
          state.gameList.splice(idx, 1);
        } else {
          game.position = action.value.currentPosition;
        }
        return { ...state };
      }
    }

    state.gameList.push({
      id: action.value.id,
      position: action.value.currentPosition,
    });

    return { ...state };
  } else if (action.type === actionTypes.setGames) {
    return { ...state, gameList: action.value.gameList };
  }
};

export { actionTypes, reducer };
