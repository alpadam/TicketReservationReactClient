import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import userReducer from './userReducer';
import authReducer from './auth';

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer,
  user: userReducer
});

export default rootReducer;
