import React from 'react';

import CountryDetails from './CountryDetails';

const Countries = ({ countries }) => {
  if (countries.length >= 10) {
    return <p>Too many matches, please be more specific... </p>;
  } else if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  } else {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    );
  }
};

export default Countries;
