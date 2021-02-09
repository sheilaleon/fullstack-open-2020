import React from 'react';
import { Link } from 'react-router-dom';

import ListGroupItem from 'react-bootstrap/ListGroupItem';

const BlogItem = ({ blog }) => {
  return (
    <ListGroupItem className="blog-item">
      <Link to={`/blogs/${blog.id}`} data-test="blog-title">
        <strong>{blog.title}</strong> by: {blog.author}
      </Link>
    </ListGroupItem>
  );
};

export default BlogItem;
