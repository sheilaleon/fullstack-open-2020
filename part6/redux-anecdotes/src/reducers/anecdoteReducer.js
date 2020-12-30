import anecdoteService from '../services/anecdotes';

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
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    case 'DEFAULT_SORTING':
      return state.sort((a, b) => b.votes - a.votes);
    default:
      return state;
  }
};

// 6.6: anecdotes, step4
// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     data: { id },
//   };
// };

export const vote = (votedAnecdote) => {
  return async (dispatch) => {
    const anecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1 };
    const upVotedAnecdote = await anecdoteService.upVote(anecdote);
    dispatch({
      type: 'VOTE',
      data: upVotedAnecdote,
    });
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    console.log('data :>> ', newAnecdote);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export default reducer;
