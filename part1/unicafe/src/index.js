import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  let total = good + neutral + bad;
  let average = ((good * 1 + bad * -1) / total || 0).toFixed(1);
  let positive = ((good / total) * 100 || 0).toFixed(1);

  return (
    <div className="statistics">
      <h3>Statistics</h3>
      <div className="stats-flex">
        <ul>
          <li>
            <span className="label">Good:</span>{' '}
            <span className="label">{good}</span>
          </li>
          <li>
            <span className="label">Neutral:</span>{' '}
            <span className="label">{neutral}</span>
          </li>
          <li>
            <span className="label">Bad:</span>{' '}
            <span className="label">{bad}</span>
          </li>
          <li>
            <span className="label">All:</span>{' '}
            <span className="label">{total}</span>
          </li>
        </ul>
        <ul>
          <li>
            <span className="label">Average:</span>{' '}
            <span className="label">{average}</span>
          </li>
          <li>{positive}% Positive</li>
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

  const handleClick = (props) => {
    console.log(props);
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
  };

  return (
    <div className="container">
      <h1>📣 Give Feedback</h1>
      <div className="feedback">
        <button type="button" onClick={() => handleClick('Good')}>
          <div className="emoji">🥰</div>
          Good
        </button>
        <button type="button" onClick={() => handleClick('Neutral')}>
          <div className="emoji">😐</div>
          Neutral
        </button>
        <button type="button" onClick={() => handleClick('Bad')}>
          <div className="emoji">🤢</div>
          Bad
        </button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
