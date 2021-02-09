import React from 'react';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  return (
    <>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            value={username}
            placeholder="Enter username"
            data-cy="login-username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            data-cy="login-password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          data-cy="login-submit"
          onClick={handleLogin}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Login;
