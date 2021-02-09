import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (e) => {
    e.preventDefault();

    createBlog({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div className="add-blog-form">
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div className="form-field-container">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            value={title}
            type="text"
            data-cy="add-blog-title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="form-field-container">
          <label htmlFor="author">Author</label>
          <input
            name="author"
            value={author}
            type="text"
            data-cy="add-blog-author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="form-field-container">
          <label htmlFor="url">Link URL</label>
          <input
            name="url"
            value={url}
            type="url"
            data-cy="add-blog-url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button type="submit" data-cy="add-blog-submit">
          Create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
