import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import userReducer from './userReducer';
import authReducer from './auth';
import eventReducer from './eventReducer'
import hostLocationReducer from './hostLocationReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer,
  user: userReducer,
  eventList: eventReducer,
  hostLocationList: hostLocationReducer
});

export default rootReducer;
