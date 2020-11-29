import React from 'react';

const Filter = (props) => {
  const { searchTerm, handleChange } = props;
  return (
    <div className="search">
      <label htmlFor="search">Filter shown with </label>
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
