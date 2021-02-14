import React, { useEffect, useState } from 'react';

const Books = (props) => {
  const [filter, setFilter] = useState(null);
  const [genres, setGenres] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const { books } = props;

  useEffect(() => {
    const getGenres = books.flatMap((book) =>
      book.genres.map((genre) => genre),
    );
    setGenres(getGenres);
  }, []); // eslint-disable-line

  if (!props.show) {
    return null;
  }

  const handleFilter = (event) => {
    setFilter(event.target.value);
    const booksByGenre = books.filter((book) =>
      book.genres.includes(event.target.value),
    );
    setFilteredBooks(booksByGenre);
  };

  return (
    <div>
      <h2>books</h2>
      {filter !== null ? (
        <p>
          in genre: <strong>{filter}</strong>
        </p>
      ) : null}

      <h3>Filter by:</h3>
      <div>
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            value={genre}
            onClick={handleFilter}
          >
            {genre}
          </button>
        ))}
        <button type="button" onClick={() => setFilter(null)}>
          all genres
        </button>
        <br />
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filter !== null
            ? filteredBooks.map((a) => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : books.map((a) => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
