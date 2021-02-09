import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

const Navbar = ({ loggedInUser, logout }) => {
  return (
    <Nav className="justify-content-end py-4 pr-4">
      <Nav.Item>
        <Nav.Link as={Link} to="/">
          Blogs
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" as={Link} to="/users">
          Users
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <div className="navbar-text px-3">{loggedInUser.name} logged in</div>
      </Nav.Item>
      <Nav.Item>
        <Button variant="outline-primary" onClick={logout}>
          Log out
        </Button>
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;
