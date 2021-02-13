import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

const QUERY = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
    allBooks {
      title
      published
      author
      id
      genres
    }
  }
`;

const App = () => {
  const [page, setPage] = useState('authors');

  const result = useQuery(QUERY);
  if (result.loading) {
    return <div>Loading...</div>;
  }
  console.log('result.data :>> ', result.data);
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} />

      <Books show={page === 'books'} books={result.data.allBooks} />

      <NewBook show={page === 'add'} />
    </div>
  );
};

export default App;
