import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';
import logger from 'redux-logger';

//add middleware here...

// logger + createStore mw
let finalCreateStore = compose(
  applyMiddleware(logger())
)(createStore);

export default function configureStore(initialState = { todos: [], user: {}}) {
  return finalCreateStore(rootReducer, initialState);
}
