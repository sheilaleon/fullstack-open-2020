const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
      const changeAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changeAnecdote,
      );
    case 'NEW_ANECDOTE':
      const newAnecdote = asObject(action.data.anecdote);
      return [...state, newAnecdote];
    case 'INIT_NOTES':
      return action.data;
    default:
      return state;
  }
};

// 6.6: anecdotes, step4
export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  };
};

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: { anecdote },
  };
};

export const initialiseAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_NOTES',
    data: anecdotes,
  };
};

export default reducer;
