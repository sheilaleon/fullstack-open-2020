import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';

import { INIT } from './queries';
import Recommendations from './components/Recommendations';

const App = () => {
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('library-token');
    if (loggedUserJSON) {
      setToken(loggedUserJSON);
    }
  }, [token]);

  const result = useQuery(INIT);
  if (result.loading) {
    return <div>Loading...</div>;
  }

  const logout = () => {
    window.localStorage.removeItem('library-token');
    setToken(null);
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token !== null ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>Login</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} setError={notify} token={token} />

      <Books show={page === 'books'} books={result.data.allBooks} />

      <NewBook show={page === 'add'} setError={notify} />

      <LoginForm
        show={page === 'login'}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
      />

      <Recommendations
        show={page === 'recommend'}
        setError={notify}
        books={result.data.allBooks}
        me={result.data.me}
      />
    </div>
  );
};

export default App;
