import { useReducer } from "react";

import { reducer, actionTypes } from "../reducers/formReducer";

const basicState = {
  redirect: false,
  isLoading: false,
  errorMessage: "",
};

const useForm = (callback, fields) => {
  const [state, dispatch] = useReducer(reducer, { ...basicState, ...fields });

  const handleChange = (event) => {
    dispatch({
      type: actionTypes.inputChange,
      value: { field: event.target.name, value: event.target.value },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch({
      type: actionTypes.loading,
    });

    const result = await callback(state);

    if (result.success) {
      dispatch({
        type: actionTypes.success,
      });
    } else {
      dispatch({
        type: actionTypes.failure,
        value: { error: result.error },
      });
    }
  };

  return [
    state.isLoading,
    state.errorMessage,
    state.redirect,
    handleChange,
    handleSubmit,
  ];
};

export default useForm;
