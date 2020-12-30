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
  return {
    type: 'SET_MESSAGE',
    timeout: setTimeout(() => {
      removeMessage();
    }, timeout),
    message,
  };
};

export const removeMessage = () => {
  return {
    type: 'REMOVE_MESSAGE',
  };
};

export default reducer;
