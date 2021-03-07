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
      return { ...state, [action.value.field]: action.value.value };
    case actionTypes.loginFailure:
      return { ...state, errorMessage: ERROR_MESSAGE, isLoading: false };
    case actionTypes.loginSuccess:
      return { ...state, redirect: true, isLoading: false };
    case actionTypes.loading:
      return { ...state, isLoading: true };
    default:
      console.log("unknown action");
      return state;
  }
};

export { actionTypes, reducer };
