import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

import BlogItem from './BlogItem';

const BlogList = ({ blogs }) => {
  return (
    <ListGroup className="pt-4">
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </ListGroup>
  );
};

export default BlogList;
