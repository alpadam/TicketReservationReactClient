import React from 'react';
import { render } from 'react-dom';
import configureStore from '../redux/store';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from '../components/App';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import Login from '../components/Login';
import Register from '../components/Register';
import RequireAuth from '../components/RequireAuth';

let initialState = {
  todos: [{
    id: 0,
    completed: false,
    text: 'Initial todo for demo...'
  }],
  auth : {
    isAuthenticated: localStorage.getItem('access_token') ? true : false,
    isFetching: false,
    errorMessage: ''
  }
};

let store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={TodoList} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="input" component={RequireAuth(TodoInput)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
