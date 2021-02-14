import React, { useEffect, useState } from 'react';
// import { useQuery } from '@apollo/client';

// import { ME } from '../queries';

const Recommendations = (props) => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const { books, me } = props;

  useEffect(() => {
    const filteredBooks = books.filter((book) =>
      book.genres.includes(me.favouriteGenre),
    );
    setFavouriteBooks(filteredBooks);
  }, []); // eslint-disable-line

  console.log('favouriteBooks :>> ', favouriteBooks);
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre <strong>{me.favouriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
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
