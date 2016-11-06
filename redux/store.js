import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

//add middleware here...

// logger + createStore mw
let finalCreateStore = compose(
  applyMiddleware(logger()),
  applyMiddleware(thunk)
)(createStore);

export default function configureStore(initialState = { todos: [], user: {}, authenticated: {}, eventList: []}) {
  return finalCreateStore(rootReducer, initialState);
}
