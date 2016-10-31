import React from 'react';
import { render } from 'react-dom';
import App from '../components/App';
import configureStore from '../redux/store';
import { Provider } from 'react-redux';
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
    <App/>
  </Provider>,
  document.getElementById('app')
);
