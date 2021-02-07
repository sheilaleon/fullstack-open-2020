import commentService from '../services/comments';
import { setMessage } from './notificationReducer';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_COMMENTS': {
      return action.data;
    }
    default:
      return state;
  }
};

export const getComments = () => {
  return async (dispatch) => {
    try {
      const request = await commentService.getAll();
      dispatch({
        type: 'INIT_COMMENTS',
        data: request,
      });
    } catch (error) {
      dispatch(setMessage(`${error.response.data.error}`, 'error', 5000));
    }
  };
};

export default reducer;
