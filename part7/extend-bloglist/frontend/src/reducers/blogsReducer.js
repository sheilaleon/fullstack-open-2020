import blogService from '../services/blogs';
import { setMessage } from './notificationReducer';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS': {
      return action.data;
    }
    case 'LIKE_BLOG': {
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog,
      );
    }
    case 'REMOVE_BLOG': {
      return action.data;
    }
    default:
      return state;
  }
};

export const getBlogs = (blogs) => {
  return async (dispatch) => {
    try {
      const request = await blogService.getAll();
      dispatch({
        type: 'INIT_BLOGS',
        data: request,
      });
    } catch (error) {
      dispatch(setMessage(error.request.data.error, 'error', 500));
    }
  };
};

export const likeBlog = (id, blogObject) => {
  return async (dispatch) => {
    try {
      const request = await blogService.update(id, blogObject);
      console.log('request :>> ', request);
      dispatch({
        type: 'LIKE_BLOG',
        data: request,
      });
    } catch (error) {
      dispatch(setMessage(error.request.data.error, 'error', 500));
    }
  };
};

export default reducer;
