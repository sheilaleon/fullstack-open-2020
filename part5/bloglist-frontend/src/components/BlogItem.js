import React, { useState } from 'react';

import blogService from '../services/blogs';

const BlogItem = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const show = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const loggedInUser = JSON.parse(window.localStorage.getItem('user'));

  const likeBlog = () => {
    const blogId = blog.id;
    const updateBlog = {
      ...blog,
      likes: ++blog.likes,
    };

    blogService.update(blogId, updateBlog).then((returnedBlog) => {
      toggleVisibility();
    });
  };

  const deleteBlog = (e) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      blogService.remove(blog.id).catch((error) => {
        console.log(error);
      });
      toggleVisibility();
    }
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

            <button className="btn-sm secondary" onClick={likeBlog}>
              Like
            </button>
          </div>
          <div>
            <span>Saved by {blog.user.name}</span>
          </div>
          {blog.user.username === loggedInUser.username ? (
            <button
              className="btn-sm secondary"
              style={{ display: 'block' }}
              onClick={deleteBlog}
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>
      <button className="btn-sm secondary" onClick={toggleVisibility}>
        View
      </button>
    </li>
  );
};

export default BlogItem;
