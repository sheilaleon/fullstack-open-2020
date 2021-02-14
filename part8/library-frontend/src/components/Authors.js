import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = (props) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [updated, setUpdated] = useState(null);

  const { setError } = props;

  const result = useQuery(ALL_AUTHORS);

  console.log('result :>> ', result);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      setUpdated(true);
    }
  }, [result.data, updated]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  function getCurrentYear() {
    const today = new Date();
    const currentYear = today.getFullYear();
    return currentYear;
  }

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const submit = async (event) => {
    event.preventDefault();

    const parseIntBorn = parseInt(born);

    if (name === '' || born === '') {
      setError(`All fields are required!`);
      return null;
    } else {
      editAuthor({
        variables: { name, setBornTo: parseIntBorn },
      });
      setBorn('');
    }
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="authors">name</label>
          <select id="authors" name="authors" onChange={handleChange}>
            <option value="">Select author</option>
            {result.data.allAuthors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="born">born</label>
          <input
            value={born}
            id="born"
            name="born"
            type="number"
            min="0"
            max={getCurrentYear()}
            onChange={({ target }) => setBorn(target.value)}
          ></input>
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default Authors;
