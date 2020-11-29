import React, { useState } from 'react';

const App = () => {
  function personExists(value, array) {
    return array.some((e) => e.name === value);
  }

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '+61 255 355 455', id: 1 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    // console.log(personExists(newName, persons));
    if (personExists(newName, persons)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  };
  return (
    <div className="container">
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div className="input-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="number">Number</label>
          <input
            id="number"
            type="tel"
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div style={{ paddingTop: '1rem' }}>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            <strong>{person.name}</strong> {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
