import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';

const initialState =  {
  authenticated: false
};

let authReducer = function(state = initialState, action) {
  switch (action.type) {
    case 'SIGN_IN_USER':

      browserHistory.push('/input');
      return Object.assign({}, state, { authenticated: true});

     case 'SIGN_IN_REQUEST':

       return Object.assign({}, state, {
         isFetching: true,
         isAuthenticated: false,
         username: action.credentials.username,
         password: action.credentials.password
       });
     case 'SIGN_IN_SUCCESS':
       browserHistory.push('/');

       return Object.assign({}, state, {
         isFetching: false,
         isAuthenticated: true,
         errorMessage: '',
         user_token: action.user.access_token
       });
     case 'SIGN_IN_FAILURE':
     console.log(action);

       return Object.assign({}, state, {
         isFetching: false,
         isAuthenticated: false,
         errorMessage: action.errorMessage
       });
    default:
      return state;
  }
}

export default authReducer;
