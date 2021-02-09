import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

const UserDetails = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added Blogs</h4>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default UserDetails;
