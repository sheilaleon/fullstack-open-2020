import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';

import { BOOKS_BY_GENRE } from '../queries';

const Recommendations = (props) => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const { me } = props;

  const client = useApolloClient();

  useEffect(() => {
    client
      .query({
        query: BOOKS_BY_GENRE,
        variables: { genre: me.favouriteGenre },
      })
      .then(({ data }) => {
        setFavouriteBooks(data.allBooks);
      });
  }, []); // eslint-disable-line

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        showing books in your favourite genre:{' '}
        <strong>{me.favouriteGenre}</strong>
      </p>

      <table>
        <tbody>
          {favouriteBooks.length > 0 && (
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
          )}
          {favouriteBooks.length > 0 ? (
            favouriteBooks.map((a, index) => (
              <tr key={index}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Sorry, no matches.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
