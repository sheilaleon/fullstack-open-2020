import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';

import { ALL_BOOKS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const result = useQuery(ALL_BOOKS);
  if (result.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} setError={notify} />

      <Books show={page === 'books'} books={result.data.allBooks} />

      <NewBook show={page === 'add'} setError={notify} />
    </div>
  );
};

export default App;
