import React from 'react';

import CountryDetails from './CountryDetails';

const Countries = ({ countries, handleClick }) => {
  if (countries.length >= 10) {
    return <p>Too many matches, please be more specific... </p>;
  } else if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  } else {
    return (
      <ul className="country-list">
        {countries.map((country) => (
          <li key={country.name}>
            {country.name}{' '}
            <button onClick={handleClick} data-country-name={country.name}>
              Show
            </button>
          </li>
        ))}
      </ul>
    );
  }
};

export default Countries;
