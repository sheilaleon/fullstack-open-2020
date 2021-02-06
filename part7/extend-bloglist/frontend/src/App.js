import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

import {
  getBlogs,
  likeBlog,
  createBlog,
  removeBlog,
} from './reducers/blogsReducer';
import { login, logout } from './reducers/userReducer';
import { getUsers } from './reducers/usersReducer';

import Login from './components/Login';
import BlogList from './components/BlogList';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import BlogForm from './components/BlogForm';
import Toggle from './components/Toggle';
import Notification from './components/Notification';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const users = useSelector((state) => state.users);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getUsers());
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

  const match = useRouteMatch('/users/:id');
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  return (
    <div className="container">
      <h1>{loggedInUser.name === undefined ? `Login` : `Blogs`}</h1>
      <Notification />
      {loggedInUser.name === undefined ? (
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
            <p>{loggedInUser.name} logged in.</p>
            <button className="btn-sm secondary" onClick={handleLogout}>
              Log out
            </button>
          </div>

          <Switch>
            <Route path="/users/:id">
              <UserDetails user={user} />
            </Route>
            <Route path="/users">
              <Users users={users} />
            </Route>
            <Route path="/">
              <Toggle buttonLabel={'Add New Blog'} ref={blogFormRef}>
                <BlogForm createBlog={handleCreateBlog} />
              </Toggle>
              <BlogList
                blogs={blogs}
                user={loggedInUser}
                handleLikeBlog={handleLikeBlog}
                handleRemoveBlog={handleRemoveBlog}
              />
            </Route>
          </Switch>
        </>
      )}
    </div>
  );
};

export default App;
