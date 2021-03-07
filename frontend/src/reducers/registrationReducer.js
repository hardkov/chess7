const ERROR_MESSAGE = "Registration error";

const actionTypes = {
  credentialsChange: "CREDENTIALS_CHANGE",
  registerFailure: "REGISTER_FAILURE",
  registerSuccess: "REGISTER_SUCCESS",
  loading: "LOADING",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.credentialsChange:
      return { ...state, [action.value.field]: action.value.value };
    case actionTypes.registerFailure:
      return { ...state, errorMessage: ERROR_MESSAGE, isLoading: false };
    case actionTypes.registerSuccess:
      return { ...state, redirect: true, isLoading: false };
    case actionTypes.loading:
      return { ...state, isLoading: true };
    default:
      console.log("unknown action");
      return state;
  }
};

export { reducer, actionTypes };
