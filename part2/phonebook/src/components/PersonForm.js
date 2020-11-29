import React from 'react';

const PersonForm = (props) => {
  const {
    addPerson,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange,
  } = props;

  return (
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
  );
};

export default PersonForm;
