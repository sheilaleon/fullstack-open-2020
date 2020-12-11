import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // fetch country data
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      if (searchTerm !== '') {
        const filteredCountries = response.data.filter((country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setCountries(filteredCountries);
      }
    });
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (e) => {
    setSearchTerm(e.target.dataset.countryName);
  };

  return (
    <div className="container">
      <Filter searchTerm={searchTerm} handleChange={handleSearchChange} />
      <Countries countries={countries} handleClick={handleClick} />
    </div>
  );
};

export default App;
