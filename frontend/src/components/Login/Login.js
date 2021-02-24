import React, { useReducer } from "react";
import { Redirect } from "react-router-dom";

import { loginUser } from "../../services/authService";
import { reducer, actionTypes } from "../../reducers/loginReducer";
import LoginForm from "./LoginForm";

const initialState = {
  username: "",
  password: "",
  redirect: false,
  isLoading: false,
  errorMessage: "",
};

const Login = () => {
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

    const didLogin = await loginUser(state.username, state.password);

    if (!didLogin) {
      dispatch({
        type: actionTypes.loginFailure,
      });
    } else {
      dispatch({
        type: actionTypes.loginSuccess,
      });
    }
  };

  if (state.redirect) {
    return <Redirect to="/" />;
  }

  return (
    <LoginForm
      isLoading={state.isLoading}
      errorMessage={state.errorMessage}
      handleCredentialsChange={handleCredentialsChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
