import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

import './App.css';
import login from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (execption) {
      console.error('Incorrect login credentials');
    }
  };

  const loginForm = () => (
    <div>
      <h1>Login</h1>

      <form>
        <div className="form-field-container">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="form-field-container">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );

  const blogList = () => (
    <div>
      <h1>Blog List</h1>

      <p>{user.name} logged in</p>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container">{user === null ? loginForm() : blogList()}</div>
  );
};

export default App;
