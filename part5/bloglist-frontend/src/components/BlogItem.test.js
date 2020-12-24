import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import BlogItem from './BlogItem';

describe('<BlogItem />', () => {
  let component;

  beforeEach(() => {
    component = render(<BlogItem user={user} blog={blog} />);
  });

  const blog = {
    title: 'Understanding Modules, Import and Export in JavaScript',
    author: 'Tania Rascia',
    url: 'https://www.taniarascia.com/javascript-modules-import-export/',
    likes: 10,
    user: {
      username: 'TestUser',
      name: 'Test User',
      id: '5fe400f8fa8d41755db615b5',
    },
    id: '5fe4012bfa8d41755db615b7',
  };

  const user = {
    username: 'TestUser',
    name: 'Test User',
    id: '5fe400f8fa8d41755db615b5',
  };

  test('Blog list item shows title and author only by default', () => {
    expect(component.container.querySelector('.blog-item')).toBeDefined();
    expect(
      component.container.querySelector('[data-test="blog-title"]'),
    ).toHaveTextContent(
      'Understanding Modules, Import and Export in JavaScript by: Tania Rascia',
    );
    expect(
      component.container.querySelector('[data-test="hidden"]'),
    ).toHaveStyle('display: none');
  });
});
