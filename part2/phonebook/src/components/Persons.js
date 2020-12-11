import React from 'react';

const Person = ({ name, number, id, handleDelete }) => {
  return (
    <li>
      <strong>{name}:</strong> {number}{' '}
      <button className="delete" onClick={() => handleDelete(id, name)}>
        Delete
      </button>
    </li>
  );
};

const Persons = (props) => {
  const { persons, showAll, searchTerm, handleDelete } = props;
  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

  return (
    <ul>
      {personsToShow.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          id={person.id}
          number={person.number}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default Persons;
