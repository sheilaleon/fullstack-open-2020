const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MESSAGE': {
      if (!state.timerId || state.timerId === action.data.timerId) {
        return action.data;
      }
      clearTimeout(state.timerId);
      return action.data;
    }
    case 'REMOVE_MESSAGE':
      return [];
    default:
      return state;
  }
};

export const setMessage = (message, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_MESSAGE',
      data: {
        message,
        timerId: setTimeout(() => {
          dispatch(removeMessage());
        }, timeout),
      },
    });
  };
};

export const removeMessage = () => {
  return {
    type: 'REMOVE_MESSAGE',
  };
};

export default reducer;
