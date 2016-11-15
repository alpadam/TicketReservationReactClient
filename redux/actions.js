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
  register: function(credentials){
    return {
      type: 'REGISTER_REQUEST'
    }
  },
  registerSuccess: function(user){
    return {
      type: 'REGISTER_SUCCESS'
    }
  },
  registerFailure: function(errorMessage){
    return {
      type: 'REGISTER_FAILURE',
      errorMessage: errorMessage
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
  },
  getTicketCategoriesList: function(){
    return {
      type: 'GET_CATEGORY_LIST',
    }
  },
  getTicketCategoriesSuccess: function(categories){
    return {
      type: 'GET_CATEGORY_LIST_SUCCESS',
      categories
    }
  },
  getTicketCategoriesFailure: function(errorMessage){
    return {
      type: 'GET_CATEGORY_LIST_FAILURE',
      errorMessage: errorMessage
    }
  }
}

export default actions;
