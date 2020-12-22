import React, { useState } from 'react';

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
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="form-field-container">
          <label htmlFor="author">Author</label>
          <input
            name="author"
            value={author}
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="form-field-container">
          <label htmlFor="url">Link URL</label>
          <input
            name="url"
            value={url}
            type="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
