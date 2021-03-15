import { useReducer } from "react";

import { loginUser } from "../services/authService";
import { reducer, actionTypes } from "../reducers/loginReducer";

const initialState = {
  username: "",
  password: "",
  redirect: false,
  isLoading: false,
  errorMessage: "",
};

const useLoginForm = () => {
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

  return [
    state.isLoading,
    state.errorMessage,
    state.redirect,
    handleCredentialsChange,
    handleSubmit,
  ];
};

export default useLoginForm;
