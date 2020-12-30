const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MESSAGE': {
      return action.message;
    }
    case 'REMOVE_MESSAGE':
      return null;
    default:
      return state;
  }
};

export const setMessage = (message, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_MESSAGE',
      message,
    });
    setTimeout(() => {
      dispatch(removeMessage());
    }, timeout);
  };
};

export const removeMessage = () => {
  return {
    type: 'REMOVE_MESSAGE',
  };
};

export default reducer;
