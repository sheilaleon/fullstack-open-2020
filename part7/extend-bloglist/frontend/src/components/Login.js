import React from 'react';

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="form-field-container">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            value={username}
            type="text"
            data-cy="login-username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="form-field-container">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={password}
            type="password"
            data-cy="login-password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" data-cy="login-submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
