import React from 'react';

import BlogItem from './BlogItem';

const BlogList = ({ blogs, user, handleLikeBlog, handleRemoveBlog }) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <BlogItem
          key={blog.id}
          blog={blog}
          user={user.username}
          likeBlog={handleLikeBlog}
          removeBlog={handleRemoveBlog}
        />
      ))}
    </ul>
  );
};

export default BlogList;
