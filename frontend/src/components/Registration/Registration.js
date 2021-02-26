import React, { useReducer } from "react";
import { Redirect } from "react-router-dom";

import { registerUser } from "../../services/authService";
import { reducer, actionTypes } from "../../reducers/registrationReducer";
import RegistrationForm from "./RegistrationForm";

const initialState = {
  username: "",
  password: "",
  redirect: false,
  isLoading: false,
  errorMessage: "",
};

const Registration = () => {
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

    const didLogin = await registerUser(state.username, state.password);

    if (!didLogin) {
      dispatch({
        type: actionTypes.registerFailure,
      });
    } else {
      dispatch({
        type: actionTypes.registerSuccess,
      });
    }
  };

  if (state.redirect) {
    return <Redirect to="/" />;
  }

  return (
    <RegistrationForm
      isLoading={state.isLoading}
      errorMessage={state.errorMessage}
      handleCredentialsChange={handleCredentialsChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Registration;
