import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import loginService from './services/login';
import blogService from './services/blogs';

import { setMessage } from './reducers/notificationReducer';
import {
  getBlogs,
  likeBlog,
  createBlog,
  removeBlog,
} from './reducers/blogsReducer';

import Login from './components/Login';
import BlogItem from './components/BlogItem';
import BlogForm from './components/BlogForm';
import Toggle from './components/Toggle';
import Notification from './components/Notification';

import './App.css';
// import store from './configureStore';

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  // * Set User's token if logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log('exception :>> ', exception);
      dispatch(setMessage(`Incorrect username or password`, 'error', 5000));
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem('user');
    setUser(null);
  };

  const handleLikeBlog = (id, blogObject) => {
    dispatch(likeBlog(id, blogObject));
  };

  const handleCreateBlog = (blogObject) => {
    dispatch(createBlog(blogObject));
  };

  const handleRemoveBlog = (id) => {
    dispatch(removeBlog(id));
  };

  const blogsSortedByLikes = blogs.sort(function (a, b) {
    return b.likes - a.likes;
  });

  return (
    <div className="container">
      <h1>{user === null ? `Login` : `Blogs`}</h1>
      <Notification />
      {user === null ? (
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <>
          <div className="user-actions">
            <p>{user.name} logged in.</p>
            <button className="btn-sm secondary" onClick={handleLogout}>
              Log out
            </button>
          </div>
          <Toggle buttonLabel={'Add New Blog'} ref={blogFormRef}>
            <BlogForm createBlog={handleCreateBlog} />
          </Toggle>
          <ul>
            {blogsSortedByLikes.map((blog) => (
              <BlogItem
                key={blog.id}
                blog={blog}
                user={user}
                likeBlog={handleLikeBlog}
                removeBlog={handleRemoveBlog}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
