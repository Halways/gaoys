/**
 * Give the state an initial value.
 */
const initialState = {
  token: undefined,
  isLoading: false,
};

/**
 * Reducer is a pure function. It does the job demanded by the action and
 * return the new state after the action.
 * @param {*} state The original state passed in by the component.
 * @param {*} action The action required by the component.
 * @return The new state after the action taken.
 */
exports.reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_TOKEN':
      return {...state, isLoading: true};
    case 'RECEIVED_TOKEN':
      return {...state, token: action.token, isLoading: false};
    case 'REQUEST_FAILED':
      return {...state, isLoading: false};

    default:
      break;
  }
  return state;
};
