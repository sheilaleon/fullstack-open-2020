import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ loggedInUser, logout }) => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Blogs</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <span>{loggedInUser.name} logged in</span>
        </li>
        <li>
          <button className="btn-sm secondary" onClick={logout}>
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
