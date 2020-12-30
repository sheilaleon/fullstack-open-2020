import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { vote } from '../reducers/anecdoteReducer';
import { removeMessage, setMessage } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === 'ALL') {
      return state.anecdote;
    } else {
      return state.anecdote.filter((a) =>
        a.content.toLowerCase().includes(state.filter.toLowerCase()),
      );
    }
  });
  const dispatch = useDispatch();

  const upVote = (votedAnecdote) => {
    dispatch(vote(votedAnecdote.id));
    dispatch(setMessage(`You've upvoted "${votedAnecdote.content}"`));
    setTimeout(() => {
      dispatch(removeMessage());
    }, 5000);
  };

  return (
    <ul>
      {anecdotes
        .sort(function (a, b) {
          return b.votes - a.votes;
        })
        .map((anecdote) => (
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
