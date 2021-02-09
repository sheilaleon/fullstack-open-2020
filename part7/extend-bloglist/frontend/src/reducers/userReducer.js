import loginService from '../services/login';
import { setMessage } from './notificationReducer';

const loggedUserJSON = window.localStorage.getItem('user');
let initialState = [];
if (loggedUserJSON) {
  const user = JSON.parse(loggedUserJSON);
  initialState = user;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      window.localStorage.setItem('user', JSON.stringify(action.data));
      return action.data;
    }
    case 'LOGOUT': {
      window.localStorage.removeItem('user');
      return {
        user: [],
      };
    }
    default:
      return state;
  }
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const request = await loginService.login({ username, password });
      dispatch({
        type: 'LOGIN',
        data: request,
      });
    } catch {
      dispatch(setMessage(`Incorrect username or password`, 'danger', 5000));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    });
  };
};

export default reducer;
