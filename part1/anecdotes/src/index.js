import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function randomise(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(
      Number.prototype.valueOf,
      0,
    ),
  );

  const handleRandomise = () => {
    setSelected(randomise(anecdotes.length));
  };

  const handleVote = (props) => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  return (
    <div className="container">
      <h3>Anecdote of the Day</h3>
      <p className="anecdote">{props.anecdotes[selected]}</p>
      <p>{points[selected]} vote(s)</p>
      <div className="actions">
        <button type="button" onClick={() => handleVote(selected)}>
          Vote
        </button>
        <button type="button" onClick={handleRandomise}>
          Next Anecdote
        </button>
      </div>
      <br />
      <br />
      <h3>Anecdote with the most votes</h3>
      <p className="anecdote">
        {props.anecdotes[points.indexOf(Math.max(...points))]}
      </p>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
