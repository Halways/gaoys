/**
 * Give the state an initial value.
 */
const initialState = {
  token: undefined,
  isLoading: false,
  modalVisible: 0,
  refresh: true,
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
    case 'SEND_REQUEST':
    case 'REQUEST_TOKEN':
      return {...state, isLoading: true};
    case 'RECEIVED_TOKEN':
      return {...state, token: action.token, isLoading: false};
    case 'REQUEST_COMPLETED':
    case 'REQUEST_FAILED':
      return {...state, isLoading: false};
    case 'SET_MODAL_VISIBLE':
      return {...state, modalVisible: action.payload};
    case 'REFRESH':
      return {...state, refresh: true};
    case 'REFRESH_DONE':
      return {...state, refresh: false};

    default:
      break;
  }
  return state;
};
