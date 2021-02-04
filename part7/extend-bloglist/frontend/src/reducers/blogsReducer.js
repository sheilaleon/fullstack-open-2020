import blogService from '../services/blogs';
import { setMessage } from './notificationReducer';

const loggedUserJSON = window.localStorage.getItem('user');
if (loggedUserJSON) {
  const user = JSON.parse(loggedUserJSON);
  blogService.setToken(user.token);
}

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
    case 'ADD_BLOG': {
      return [...state, action.data];
    }
    default:
      return state;
  }
};

export const getBlogs = (blogs) => {
  return async (dispatch) => {
    try {
      const request = await blogService.getAll();
      const blogsSortedByLikes = request.sort(function (a, b) {
        return b.likes - a.likes;
      });
      dispatch({
        type: 'INIT_BLOGS',
        data: blogsSortedByLikes,
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
      console.log('request :>> ', request);
      dispatch({
        type: 'ADD_BLOG',
        data: request,
      });
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

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id);
      const request = await blogService.getAll();
      dispatch({
        type: 'INIT_BLOGS',
        data: request,
      });
      dispatch(
        setMessage(`Blog "${blog.title}" was deleted.`, 'success', 5000),
      );
    } catch (error) {
      dispatch(setMessage(`${error.response.data.error}`, 'error', 5000));
    }
  };
};

export default reducer;
