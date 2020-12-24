import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

describe('<BlogItem />', () => {
  let component;

  beforeEach(() => {
    component = render(<Blog user={user} blog={blog} />);
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
});
