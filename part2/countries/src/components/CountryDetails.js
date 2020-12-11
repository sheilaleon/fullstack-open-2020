import React from 'react';

const CountryDetails = (props) => {
  const { name, capital, population, languages, flag } = props.country;
  return (
    <div>
      <h1>{name}</h1>
      <p>
        <strong>Capital:</strong> {capital}
      </p>
      <p>
        <strong>Population:</strong> {population.toLocaleString()}
      </p>
      <h2>Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={flag} alt={name} width="250" style={{ marginTop: '1rem' }} />
    </div>
  );
};

export default CountryDetails;
