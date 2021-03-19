import { useEffect, useRef, useReducer } from "react";
import { getGameList } from "../services/gameService";
import { liveGamesSource } from "../services/userService";
import { actionTypes, reducer } from "../reducers/gamesReducer";

const initialState = {
  gameList: [],
};

const useGames = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const subscribtionRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const gameList = await getGameList();

      dispatch({
        type: actionTypes.setGames,
        value: { gameList },
      });
    };

    subscribtionRef.current = liveGamesSource().subscribe(
      ({ id, currentPosition }) => {
        dispatch({
          type: actionTypes.updateGame,
          value: { id, currentPosition },
        });
      }
    );

    fetchData();

    return () => {
      if (subscribtionRef.current) {
        subscribtionRef.current.unsubscribe();
      }
    };
  }, []);

  return state;
};

export default useGames;
