let actions = {
  signIn: function(credentials){
    return {
      type: 'SIGN_IN_REQUEST',
      credentials
    }
  },
  signInSuccess: function(user){
    return {
      type: 'SIGN_IN_SUCCESS',
      user
    }
  },
  signInFailure: function(errorMessage){
    return {
      type: 'SIGN_IN_FAILURE',
      errorMessage: errorMessage
    }
  },
  logOut: function(){
    return {
      type: 'LOG_OUT_REQUEST'
    }
  },
  getEventList: function(){
    return {
      type: 'GET_EVENT_LIST',
    }
  },
  getEventListSuccess: function(events){
    return {
      type: 'GET_EVENT_LIST_SUCCESS',
      events
    }
  },
  getEventListFailure: function(errorMessage){
    return {
      type: 'GET_EVENT_LIST_FAILURE',
      errorMessage: errorMessage
    }
  }
}

export default actions;
