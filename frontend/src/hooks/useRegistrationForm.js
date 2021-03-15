import { useReducer } from "react";

import { registerUser } from "../services/authService";
import { reducer, actionTypes } from "../reducers/registrationReducer";

const initialState = {
  username: "",
  password: "",
  redirect: false,
  isLoading: false,
  errorMessage: "",
};

const useRegistrationForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCredentialsChange = (event) => {
    dispatch({
      type: actionTypes.credentialsChange,
      value: { field: event.target.name, value: event.target.value },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({
      type: actionTypes.loading,
    });

    const didRegister = await registerUser(state.username, state.password);

    if (!didRegister) {
      dispatch({
        type: actionTypes.registerFailure,
      });
    } else {
      dispatch({
        type: actionTypes.registerSuccess,
      });
    }
  };

  return [
    state.isLoading,
    state.errorMessage,
    state.redirect,
    handleCredentialsChange,
    handleSubmit,
  ];
};

export default useRegistrationForm;
