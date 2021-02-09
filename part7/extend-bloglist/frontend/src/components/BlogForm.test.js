import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  let component;

  const createBlog = jest.fn();

  beforeEach(() => {
    component = render(<BlogForm createBlog={createBlog} />);
  });

  const newBlog = {
    title: 'Understanding Modules, Import and Export in JavaScript',
    author: 'Tania Rascia',
    url: 'https://www.taniarascia.com/javascript-modules-import-export/',
  };

  test('new blog is displayed when user submits new blog', () => {
    const form = component.container.querySelector('form');
    const title = component.container.querySelector('[name="title"]');
    const author = component.container.querySelector('[name="author"]');
    const url = component.container.querySelector('[name="url"]');
    const submit = component.getByText('Create');

    fireEvent.change(title, {
      target: { value: 'A Blog Title' },
    });
    fireEvent.change(author, {
      target: { value: 'A Unknown Author' },
    });
    fireEvent.change(url, {
      target: { value: 'https://www.blogsRus.io/a-blog-title' },
    });
    fireEvent.click(submit);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('A Blog Title');
    expect(createBlog.mock.calls[0][0].author).toBe('A Unknown Author');
    expect(createBlog.mock.calls[0][0].url).toBe(
      'https://www.blogsRus.io/a-blog-title',
    );
  });
});
