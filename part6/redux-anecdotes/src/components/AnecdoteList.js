import React from 'react';
import { connect } from 'react-redux';

import { vote } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const upVote = (anecdote) => {
    props.vote(anecdote);
    props.setMessage(`You've upvoted "${anecdote.content}"`, 5000);
  };

  return (
    <ul>
      {props.anecdote.map((anecdote) => (
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

const mapStateToProps = (state) => {
  if (state.query === 'ALL') {
    return {
      anecdote: state.anecdotes.sort((a, b) => b.votes - a.votes),
    };
  }
  return {
    anecdote: state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.query.toLowerCase()),
      )
      .sort((a, b) => b.votes - a.votes),
  };
};

const mapDispatchToProps = {
  vote,
  setMessage,
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList);
export default ConnectedAnecdotes;
