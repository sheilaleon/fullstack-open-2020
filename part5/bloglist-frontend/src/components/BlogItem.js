import React, { useState } from 'react';

import blogService from '../services/blogs';

const BlogItem = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  const show = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const likeBlog = () => {
    const blogId = blog.id;
    setLiked(!liked);
    const updateBlog = {
      ...blog,
      likes: ++blog.likes,
    };

    blogService.update(blogId, updateBlog).then((returnedBlog) => {
      setLiked(!liked);
    });
  };

  return (
    <li className="blog-item">
      <div>
        <span>
          <strong>{blog.title}</strong> by: {blog.author}
        </span>
        <div style={show}>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
          <div>
            {blog.likes === 1 ? (
              <span>
                <strong>{blog.likes}</strong> Like
              </span>
            ) : (
              <span>
                <strong>{blog.likes}</strong> Likes
              </span>
            )}

            <button className="btn-sm secondary" onClick={() => likeBlog()}>
              Like
            </button>
          </div>
          <span>Saved by {blog.user.name}</span>
        </div>
      </div>
      <button className="btn-sm secondary" onClick={toggleVisibility}>
        View
      </button>
    </li>
  );
};

export default BlogItem;
