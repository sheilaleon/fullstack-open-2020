import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
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

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (execption) {
      console.error('Incorrect login credentials');
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    window.localStorage.removeItem('user');
  };

  const createBlog = (e) => {
    e.preventDefault();

    const blogObject = {
      title,
      author,
      url,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
    });
  };

  const loginForm = () => (
    <>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div className="form-field-container">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            value={username}
            type="text"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="form-field-container">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </>
  );

  const blogList = () => (
    <>
      <h1>Blogs</h1>
      <div className="user-actions">
        <p>{user.name} logged in.</p>
        <button className="btn-sm" onClick={handleLogout}>
          Log out
        </button>
      </div>

      <div className="add-blog-form">
        <h2>Create New</h2>
        <form onSubmit={createBlog}>
          <div className="form-field-container">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              value={title}
              type="text"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div className="form-field-container">
            <label htmlFor="author">Author</label>
            <input
              name="author"
              value={author}
              type="text"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div className="form-field-container">
            <label htmlFor="url">Link URL</label>
            <input
              name="url"
              value={url}
              type="text"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>

      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </>
  );

  return (
    <div className="container">{user === null ? loginForm() : blogList()}</div>
  );
};

export default App;
