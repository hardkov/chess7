const ERROR_MESSAGE = "Login error";

const actionTypes = {
  credentialsChange: "CREDENTIALS_CHANGE",
  loginFailure: "LOGIN_FAILURE",
  loginSuccess: "LOGIN_SUCCESS",
  loading: "LOADING",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.credentialsChange:
      state[action.value.field] = action.value.value;
      return { ...state };
    case actionTypes.loginFailure:
      state.errorMessage = ERROR_MESSAGE;
      state.isLoading = false;
      return { ...state };
    case actionTypes.loginSuccess:
      state.redirect = true;
      state.isLoading = false;
      return { ...state };
    case actionTypes.loading:
      state.isLoading = true;
      return { ...state };
    default:
      console.log("No such action type");
  }
};

export { actionTypes, reducer };
