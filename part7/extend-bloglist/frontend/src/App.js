import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getBlogs,
  likeBlog,
  createBlog,
  removeBlog,
} from './reducers/blogsReducer';
import { login, logout } from './reducers/userReducer';

import Login from './components/Login';
import BlogItem from './components/BlogItem';
import BlogForm from './components/BlogForm';
import Toggle from './components/Toggle';
import Notification from './components/Notification';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const blogFormRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(login(username, password));

    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    dispatch(logout());
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

  return (
    <div className="container">
      <h1>{user.name === undefined ? `Login` : `Blogs`}</h1>
      <Notification />
      {user.name === undefined ? (
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
            {blogs.map((blog) => (
              <BlogItem
                key={blog.id}
                blog={blog}
                user={user.username}
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
