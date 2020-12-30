import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { vote } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdote);

  dispatch({ type: 'DEFAULT_SORTING' });

  const upVote = (votedAnecdote) => {
    dispatch(vote(votedAnecdote));
    dispatch(setMessage(`You've upvoted "${votedAnecdote.content}"`, 5000));
  };

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <span>{anecdote.content}</span>
          <div className="vote-container">
            has {anecdote.votes}
            <button onClick={() => upVote(anecdote)}>vote</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AnecdoteList;
