import usersService from '../services/users';
import { setMessage } from './notificationReducer';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS': {
      return action.data;
    }
    default:
      return state;
  }
};

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const request = await usersService.getUsers();
      dispatch({
        type: 'GET_USERS',
        data: request,
      });
    } catch (error) {
      dispatch(setMessage(`${error.response.data.error}`, 'error', 5000));
    }
  };
};

export default reducer;
