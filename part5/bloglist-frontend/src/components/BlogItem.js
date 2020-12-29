import React, { useState } from 'react';

const BlogItem = ({ blog, user, likeBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  const show = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const like = () => {
    const { id, title, author, url, user } = blog;
    const blogObject = {
      user,
      likes: ++blog.likes,
      title,
      author,
      url,
    };
    likeBlog(id, blogObject);
  };

  const remove = (e) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      removeBlog(blog.id);
    }
  };

  return (
    <li className="blog-item">
      <div>
        <span data-test="blog-title">
          <strong>{blog.title}</strong> by: {blog.author}
        </span>
        <div data-test="hidden" style={show}>
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            data-test="url"
          >
            {blog.url}
          </a>
          <div data-test="likes">
            {blog.likes === 1 ? (
              <span>
                <strong>{blog.likes}</strong> Like
              </span>
            ) : (
              <span>
                <strong>{blog.likes}</strong> Likes
              </span>
            )}

            <button
              className="btn-sm secondary"
              data-cy="blog-like"
              onClick={like}
            >
              Like
            </button>
          </div>
          <div>
            <span>Saved by {blog.user.name}</span>
          </div>
          <div>
            {blog.user.username === user.username ? (
              <button
                className="btn-sm secondary"
                style={{ display: 'block' }}
                onClick={remove}
              >
                Remove
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <button
        className="btn-sm secondary"
        data-cy="blog-view"
        onClick={toggleVisibility}
      >
        View
      </button>
    </li>
  );
};

export default BlogItem;
