import React from 'react';
import { useDispatch } from 'react-redux';

import { createAnecdote } from '../reducers/anecdoteReducer';
import { setMessage, removeMessage } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = '';
    dispatch(createAnecdote(anecdote));
    dispatch(setMessage(`You've created ${anecdote}.`, 5000));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote} className="create-container">
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
