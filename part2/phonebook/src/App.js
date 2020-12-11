import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  function personExists(value, array) {
    return array.some((e) => e.name === value);
  }

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    const handlePersons = (response) => {
      setPersons(response.data);
    };

    const promise = axios.get('http://localhost:3001/persons');
    promise.then(handlePersons);
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setShowAll(false);
    setSearchTerm(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (personExists(newName, persons)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');

      axios
        .post('http://localhost:3001/persons', personObject)
        .then((response) => {
          console.log(response);
        });
    }
  };

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleChange={handleSearchChange} />

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} searchTerm={searchTerm} showAll={showAll} />
    </div>
  );
};

export default App;
