import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ emoji, text, handleClick }) => {
  return (
    <button type="button" onClick={handleClick}>
      <div className="emoji">{emoji}</div>
      {text}
    </button>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <li>
      <span className="label">{text}:</span>{' '}
      <span className="label">{value}</span>
    </li>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;
  let average = ((good * 1 + bad * -1) / total || 0).toFixed(1);
  let positive = ((good / total) * 100 || 0).toFixed(1);

  return (
    <div className="statistics">
      <h3>Statistics</h3>
      <div className="stats-flex">
        <ul>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={total} />
        </ul>
        <ul>
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positive} />
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [showStats, setShowStats] = useState(false);

  const castFeedback = (props) => {
    switch (props) {
      case 'Good':
        setGood(good + 1);
        break;
      case 'Neutral':
        setNeutral(neutral + 1);
        break;
      case 'Bad':
        setBad(bad + 1);
        break;
      default:
    }
    setShowStats(true);
  };

  return (
    <div className="container">
      <h1>📣 Give Feedback</h1>
      <div className="feedback">
        <Button
          text="Good"
          emoji="🥰"
          handleClick={() => {
            castFeedback('Good');
          }}
        />
        <Button
          text="Neutral"
          emoji="😐"
          handleClick={() => {
            castFeedback('Neutral');
          }}
        />
        <Button
          text="Bad"
          emoji="🤢"
          handleClick={() => {
            castFeedback('Bad');
          }}
        />
      </div>
      {showStats ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p className="statistics">
          <em>No feedback given</em>
        </p>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
