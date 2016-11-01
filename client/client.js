import React from 'react';
import { render } from 'react-dom';
import App from '../components/App';
import configureStore from '../redux/store';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';

//es 5
//var React = require('react');
//var render = require('react-dom').render;

let initialState = {
  todos: [{
    id: 0,
    completed: false,
    text: 'Initial todo for demo...'
  }],
  user: {
    username: 'Adam',
    id: 15
  }
};

let store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={TodoList}  />
        <Route path="input" component={TodoInput} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
