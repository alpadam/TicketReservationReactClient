import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import userReducer from './userReducer';
import authReducer from './auth';
import eventReducer from './eventReducer';
import ticketCategoryReducer from './ticketCategoryReducer';
import hostLocationReducer from './hostLocationReducer';
import eventDetailsReducer from './eventDetailsReducer'
import commentReducer from './commentReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer,
  user: userReducer,
  eventList: eventReducer,
  ticketCategories: ticketCategoryReducer,
  hostLocationList: hostLocationReducer,
  eventDetails: eventDetailsReducer,
  eventComments: commentReducer
});

export default rootReducer;
