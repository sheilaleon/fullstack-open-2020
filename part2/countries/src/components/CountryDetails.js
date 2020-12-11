import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
  const [currentTemp, setCurrentTemp] = useState([]);

  const apiKey = process.env.REACT_APP_WEATHERSTACK_API;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}&m&en`,
      )
      .then((response) => setCurrentTemp(response.data.current));
  }, [apiKey, capital]);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>
        <strong>Temperature:</strong> {currentTemp.temperature}° C
      </p>
      <img
        src={currentTemp.weather_icons}
        alt={`${currentTemp.temperature}° - ${currentTemp.weather_descriptions}`}
      />
      <p>
        <strong>Wind:</strong> {currentTemp.wind_speed} kph, direction{' '}
        {currentTemp.wind_dir}
      </p>
    </div>
  );
};

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
      <Weather capital={capital} />
    </div>
  );
};

export default CountryDetails;
