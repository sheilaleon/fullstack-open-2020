import React from 'react';
import { Link } from 'react-router-dom';

import Table from 'react-bootstrap/Table';

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Users</th>
            <th style={{ textAlign: 'right' }}>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td style={{ textAlign: 'right' }}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
