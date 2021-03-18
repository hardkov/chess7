const actionTypes = {
  inputChange: "INPUT_CHANGE",
  failure: "FAILURE",
  success: "SUCCESS",
  loading: "LOADING",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.inputChange:
      return { ...state, [action.value.field]: action.value.value };
    case actionTypes.failure:
      return { ...state, errorMessage: action.value.error, isLoading: false };
    case actionTypes.success:
      return { ...state, redirect: true, isLoading: false };
    case actionTypes.loading:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export { actionTypes, reducer };
