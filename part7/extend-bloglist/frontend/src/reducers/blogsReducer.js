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
      dispatch(setMessage(`${error.response.data.error}`, 'error', 5000));
    }
  };
};

export const likeBlog = (id, blogObject) => {
  return async (dispatch) => {
    try {
      const request = await blogService.update(id, blogObject);
      dispatch({
        type: 'LIKE_BLOG',
        data: request,
      });
    } catch (error) {
      dispatch(setMessage(`${error.response.data.error}`, 'error', 5000));
    }
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const request = await blogService.create(blogObject);
      dispatch(
        setMessage(
          `A new blog "${request.title}" by ${request.author} has been added.`,
          'success',
          5000,
        ),
      );
    } catch (error) {
      dispatch(setMessage(`${error.response.data.error}`, 'error', 5000));
    }
  };
};

export default reducer;
