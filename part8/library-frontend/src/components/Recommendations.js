import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

// import { ME } from '../queries';

const Recommendations = (props) => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [getBooks, { loading, data}] = useLazyQuery()
  const { books, me } = props;

  useEffect(() => {
    const filteredBooks = books.filter((book) =>
      book.genres.includes(me.favouriteGenre),
    );
    setFavouriteBooks(filteredBooks);
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
            favouriteBooks.map((a) => (
              <tr key={a.id}>
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
