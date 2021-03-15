import { useEffect, useReducer, useRef } from "react";

import {
  positionSource,
  openMoveConnection,
  closeMoveConnection,
} from "../services/gameService.js";
import { checkIfIsPlaying } from "../services/gameService";
import { actionTypes, reducer } from "../reducers/playReducer.js";
import { gameStates } from "../helpers/chess";

const initialState = {
  enemy: null,
  color: null,
  position: null,
  drawOfferedBy: null,
  isLoading: false,
  gameState: gameStates.playing,
};

const useGameData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const subscribtionRef = useRef(null);

  useEffect(() => {
    dispatch({
      type: actionTypes.loading,
      value: { isLoading: true },
    });

    async function fetchData() {
      const gameData = await checkIfIsPlaying();

      if (gameData) {
        openMoveConnection();

        subscribtionRef.current = positionSource().subscribe((moveData) => {
          dispatch({
            type: actionTypes.positionChange,
            value: { moveData },
          });
        });

        dispatch({
          type: actionTypes.dataSetting,
          value: { gameData },
        });

        return;
      }

      dispatch({
        type: actionTypes.loading,
        value: { isLoading: false },
      });
    }
    fetchData();

    return () => {
      closeMoveConnection();
      if (subscribtionRef.current) {
        subscribtionRef.current.unsubscribe();
      }
    };
  }, []);

  return [state, dispatch];
};

export default useGameData;
