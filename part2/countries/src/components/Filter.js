import React from 'react';

const Filter = ({ searchTerm, handleChange }) => {
  return (
    <div className="search">
      <label htmlFor="filter">Find a Country </label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default Filter;
