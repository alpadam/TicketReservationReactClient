import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';

const initialState =  {
  authenticated: false
};

let authReducer = function(state = initialState, action) {
  switch (action.type) {
     case 'SIGN_IN_REQUEST':
       return Object.assign({}, state, {
         isFetching: true,
         isAuthenticated: false,
         isAdmin: false,
         username: action.credentials.username,
         password: action.credentials.password
       });
     case 'SIGN_IN_SUCCESS':
       return Object.assign({}, state, {
         isFetching: false,
         isAuthenticated: true,
         isAdmin: action.user.isAdmin,
         errorMessage: '',
         user_token: action.user.access_token
       });
     case 'SIGN_IN_FAILURE':
       return Object.assign({}, state, {
         isFetching: false,
         isAuthenticated: false,
         isAdmin: false,
         errorMessage: action.errorMessage
       });
     case 'LOG_OUT_REQUEST':
       return Object.assign({}, state, {
         isFetching: false,
         isAuthenticated: false,
         isAdmin: false,
         errorMessage: '',
         user_token: '',
         username: '',
         password: ''
       });
       case 'REGISTER_REQUEST':
         return Object.assign({}, state, {
           isRegisterLoading: true
         });
       case 'REGISTER_SUCCESS':
         return Object.assign({}, state, {
           isRegisterLoading: false,
           errorMessage: ''
         });
       case 'REGISTER_FAILURE':
         return Object.assign({}, state, {
           isRegisterLoading: false,
           errorMessage: action.errorMessage
         });
    default:
      return state;
  }
}

export default authReducer;
