import { makeMove } from "../services/gameService";
import { actionTypes } from "../reducers/playReducer";
import { validateMove, moveTypes } from "../helpers/chess";

const useOnDrop = (position, dispatch) => {
  const onDrop = async ({ sourceSquare, targetSquare }) => {
    const { move, newPosition } = validateMove(
      sourceSquare,
      targetSquare,
      position
    );

    if (newPosition == null) return;

    const moveData = { type: moveTypes.normal, currentPosition: newPosition };
    dispatch({
      type: actionTypes.positionChange,
      value: { moveData },
    });

    makeMove(move);
  };

  return onDrop;
};

export default useOnDrop;
