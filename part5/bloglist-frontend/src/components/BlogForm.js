import React from 'react';

const BlogForm = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  createBlog,
}) => (
  <div className="add-blog-form">
    <h2>Create New</h2>
    <form onSubmit={createBlog}>
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
          type="text"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
);

export default BlogForm;
