import React from 'react';

const BlogDetails = ({ blog, user, likeBlog, removeBlog }) => {
  if (!blog) {
    return null;
  }

  console.log('comments :>> ', blog.comments);

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
    <div>
      <h2>{blog.title}</h2>
      <div data-test="hidden">
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
        {blog.comments !== undefined ? (
          <div>
            <h3>Comments</h3>
            <ul>
              {blog.comments.map((comment) => (
                <li key={comment.id}>{comment.comment}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BlogDetails;
