import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import anecdoteService from './services/anecdotes';
import anecdoteReducer, {
  initialiseAnecdotes,
} from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools());

anecdoteService
  .getAll()
  .then((anecdotes) => store.dispatch(initialiseAnecdotes(anecdotes)));

export default store;
