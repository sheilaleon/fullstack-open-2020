import React from 'react';

const Person = ({ name, number }) => {
  return (
    <li>
      <strong>{name}</strong> {number}
    </li>
  );
};

const Persons = (props) => {
  const { persons, showAll, searchTerm } = props;
  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

  return (
    <ul>
      {personsToShow.map((person) => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))}
    </ul>
  );
};

export default Persons;
