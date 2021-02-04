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
      removeBlog(blog);
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
            <span>
              <strong>{blog.likes} </strong>
              {blog.likes === 1 ? 'Like' : 'Likes'}
            </span>
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
            {blog.user.username === user ? (
              <button
                className="btn-sm secondary"
                style={{ display: 'block' }}
                onClick={remove}
                data-cy="blog-delete"
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
