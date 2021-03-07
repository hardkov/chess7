import React, { useEffect, useReducer, useRef } from "react";
import Chess from "chess.js";

import {
  positionSource,
  openMoveConnection,
  closeMoveConnection,
  makeMove,
} from "../../services/gameService.js";
import { checkIfIsPlaying } from "../../services/gameService";
import {
  actionTypes,
  reducer,
  gameStates,
} from "../../reducers/playReducer.js";
import BoardMenu from "./BoardMenu";

const initialState = {
  enemy: null,
  color: null,
  position: null,
  isLoading: false,
  gameState: gameStates.playing,
};

export default function Play() {
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

        subscribtionRef.current = positionSource().subscribe(
          ({ currentPosition }) => {
            dispatch({
              type: actionTypes.positionChange,
              value: { position: currentPosition },
            });
          }
        );

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

  const onDrop = async ({ sourceSquare, targetSquare }) => {
    const game = new Chess(state.position);
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // change this to allow user to chose promotion piece
    });

    if (move == null) {
      return;
    }

    dispatch({
      type: actionTypes.positionChange,
      value: { position: game.fen() },
    });

    makeMove(move);
  };

  return (
    <BoardMenu
      position={state.position}
      color={state.color}
      enemy={state.enemy}
      onDrop={onDrop}
      isLoading={state.isLoading}
      gameState={state.gameState}
    />
  );
}
