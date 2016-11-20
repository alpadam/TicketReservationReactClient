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
import RequireAdmin from '../components/RequireAdmin';
import NotFoundPage from '../components/NotFoundPage'
import EventList from '../components/EventList';
import EventDetailedItem from '../components/EventDetailedItem';
import EventEditItem from '../components/EventEditItem';
import TicketCategoryEditList from '../components/TicketCategoryEditList';
import HostLocationEditList from '../components/HostLocationEditList';
import UserProfile from '../components/UserProfile';

let initialState = {
  auth : {
    isAuthenticated: localStorage.getItem('access_token') ? true : false,
    isAdmin: localStorage.getItem('isAdmin') === 'True' ? true : false,
    isFetching: false,
    errorMessage: ''
  },
  eventList : {
    isFetching: false,
    errorMessage: '',
    events: []
  },
  ticketCategories: {
    isFetching: false,
    errorMessage: '',
    categories: []
  },
  hostLocationList : {
    isFetching: false,
    errorMessage: '',
    hostLocations: []
  },
  eventDetails : {
    isFetching: false,
    errorMessage: '',
    event: {}
  },
  eventComments : {
    isFetching: false,
    errorMessage: '',
    comments: []
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
        <Route path="events/:id" component={EventDetailedItem} />

        <Route path="admin/event/add" component={RequireAdmin(EventEditItem)} />
        <Route path="admin/event/:id/edit" component={RequireAdmin(EventEditItem)} />
        <Route path="admin/ticketcategories" component={RequireAdmin(TicketCategoryEditList)} />
        <Route path="admin/hostLocations" component={RequireAdmin(HostLocationEditList)} />

        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
