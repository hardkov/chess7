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
      state[action.value.field] = action.value.value;
      return { ...state };
    case actionTypes.registerFailure:
      state.errorMessage = ERROR_MESSAGE;
      state.isLoading = false;
      return { ...state };
    case actionTypes.registerSuccess:
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

export { reducer, actionTypes };
