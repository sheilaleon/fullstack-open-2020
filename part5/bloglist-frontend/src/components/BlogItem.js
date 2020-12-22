import React, { useState } from 'react';

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);

  const show = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <li className="blog-item">
      <div>
        <span>
          <strong>{blog.title}</strong> by: {blog.author}
        </span>
        <div style={show}>
          <a href="{blog.url}" target="_blank">
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

            <button className="btn-sm secondary">Like</button>
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

export default Blog;
