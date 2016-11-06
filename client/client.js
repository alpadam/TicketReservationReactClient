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
import NotFoundPage from '../components/NotFoundPage'
import EventList from '../components/EventList'
import UserProfile from '../components/UserProfile'

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
  },
  eventList : {
    isFetching: false,
    errorMessage: '',
    events: [
    {
      EventId: 1,
      Name: 'punnany massif concert',
      Description: 'sthing fancy description about the band...',
      HostLocation: 'Budapest park',
      Date: '2016.11.11.',
      IsSuspended: false
    },
    {
      EventId: 2,
      Name: 'wellhello',
      Description: 'sthing fancy description about the band...',
      HostLocation: 'Akvárium',
      Date: '2016.11.18.',
      IsSuspended: false
    }]
  }
};

let store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={EventList} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="input" component={RequireAuth(TodoInput)} />
        <Route path="userProfile" component={RequireAuth(UserProfile)} />

        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
