import React, { useState, useEffect } from 'react';

import loginService from './services/login';
import blogService from './services/blogs';

import Login from './components/Login';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [notificationState, setNotificationState] = useState(null);

  function displayNotification() {
    setTimeout(() => {
      setNotification(null);
      setNotificationState(null);
    }, 5000);
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // Set User's token if logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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
      setNotification(`Incorrect username of password`);
      setNotificationState('error');
      displayNotification();
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem('user');
    setUser(null);
  };

  const createBlog = (e) => {
    e.preventDefault();

    const blogObject = {
      title,
      author,
      url,
    };

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setTitle('');
        setAuthor('');
        setUrl('');
        setNotification(`A new blog "${title}" by ${author} has been added.`);
        setNotificationState('success');
        displayNotification();
      })
      .catch((error) => {
        setNotification(`${error.response.data.error}`);
        setNotificationState('error');
        displayNotification();
      });
  };

  return (
    <div className="container">
      <h1>{user === null ? `Login` : `Blogs`}</h1>
      <Notification
        notification={notification}
        notificationState={notificationState}
      />
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
            <button className="btn-sm" onClick={handleLogout}>
              Log out
            </button>
          </div>
          <BlogForm
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            createBlog={createBlog}
          />
          <BlogList blogs={blogs} />
        </>
      )}
    </div>
  );
};

export default App;
