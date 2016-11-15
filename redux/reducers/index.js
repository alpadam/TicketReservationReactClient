import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import userReducer from './userReducer';
import authReducer from './auth';
import eventReducer from './eventReducer';
import ticketCategoryReducer from './ticketCategoryReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer,
  user: userReducer,
  eventList: eventReducer,
  ticketCategories: ticketCategoryReducer
});

export default rootReducer;
