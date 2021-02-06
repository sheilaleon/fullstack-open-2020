import React from 'react';
import { Link } from 'react-router-dom';

const BlogItem = ({ blog }) => {
  return (
    <li className="blog-item">
      <Link to={`/blogs/${blog.id}`} data-test="blog-title">
        <strong>{blog.title}</strong> by: {blog.author}
      </Link>
    </li>
  );
};

export default BlogItem;
