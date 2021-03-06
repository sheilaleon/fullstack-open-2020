import React from 'react';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import CommentForm from './CommentForm';

const BlogDetails = ({
  blog,
  user,
  addComment,
  handleLikeBlog,
  handleRemoveBlog,
}) => {
  if (!blog) {
    return null;
  }

  const like = () => {
    const { id, title, author, url, user } = blog;
    const blogObject = {
      user,
      likes: ++blog.likes,
      title,
      author,
      url,
    };
    handleLikeBlog(id, blogObject);
  };

  const remove = (e) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      handleRemoveBlog(blog);
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
          <Button size="sm" data-cy="blog-like" onClick={like}>
            Like
          </Button>
        </div>
        <div>
          <span>Saved by {blog.user.name}</span>
        </div>
        <div>
          {blog.user.username === user.username ? (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={remove}
              data-cy="blog-delete"
            >
              Remove
            </Button>
          ) : null}
        </div>
        <div>
          <h3>Comments</h3>
          <CommentForm addComment={addComment} id={blog.id} />
          {blog.comments !== undefined ? (
            <ListGroup variant="flush">
              {blog.comments.map((comment) => (
                <ListGroup.Item key={comment.id}>
                  {comment.comment}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
