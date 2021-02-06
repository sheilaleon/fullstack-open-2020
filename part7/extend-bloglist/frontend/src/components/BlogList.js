import React from 'react';

import BlogItem from './BlogItem';

const BlogList = ({ blogs }) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </ul>
  );
};

export default BlogList;
