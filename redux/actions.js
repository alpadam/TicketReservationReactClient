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
  },
  addTicketCategory: function(){
    return {
      type: 'ADD_TICKET_CATEGORY',
    }
  },
  addTicketCategorySuccess: function(category){
    return {
      type: 'ADD_TICKET_CATEGORY_SUCCESS',
      category
    }
  },
  addTicketCategoryFailure: function(errorMessage){
    return {
      type: 'ADD_TICKET_CATEGORY_FAILURE',
      errorMessage: errorMessage
    }
  },
  getHostLocationList: function(){
    return {
      type: 'GET_HOST_LOCATION_LIST',
    }
  },
  getHostLocationListSuccess: function(hostLocations){
    return {
      type: 'GET_HOST_LOCATION_LIST_SUCCESS',
      hostLocations
    }
  },
  getHostLocationListFailure: function(errorMessage){
    return {
      type: 'GET_HOST_LOCATION_LIST_FAILURE',
      errorMessage: errorMessage
    }
  },
  handleError: function(){
      return {
        type: 'ERROR_HANDLED'
      }
  },
  addHostLocation: function(){
    return {
      type: 'ADD_HOST_LOCATION'
    }
  },
  addHostLocationSuccess: function(hostLocation){
    return {
      type: 'ADD_HOST_LOCATION_SUCCESS',
      hostLocation
    }
  },
  addHostLocationFailure: function(errorMessage){
    return {
      type: 'ADD_HOST_LOCATION_FAILURE',
      errorMessage: errorMessage
    }
  },
  deleteHostLocation: function(){
    return {
      type: 'DELETE_HOST_LOCATION'
    }
  },
  deleteHostLocationSuccess: function(id){
    return {
      type: 'DELETE_HOST_LOCATION_SUCCESS',
      id
    }
  },
  deleteHostLocationFailure: function(errorMessage){
    return {
      type: 'DELETE_HOST_LOCATION_FAILURE',
      errorMessage: errorMessage
    }
  },
  deleteTicketCategory: function(){
    return {
      type: 'DELETE_TICKET_CATEGORY'
    }
  },
  deleteTicketCategorySuccess: function(id){
    return {
      type: 'DELETE_TICKET_CATEGORY_SUCCESS',
      id
    }
  },
  deleteTicketCategoryFailure: function(errorMessage){
    return {
      type: 'DELETE_TICKET_CATEGORY_FAILURE',
      errorMessage: errorMessage
    }
  },
  getEventDetails: function(){
    return {
      type: 'GET_EVENT_DETAILS',
    }
  },
  getEventDetailsSuccess: function(event){
    return {
      type: 'GET_EVENT_DETAILS_SUCCESS',
      event
    }
  },
  getEventDetailsFailure: function(errorMessage){
    return {
      type: 'GET_EVENT_DETAILS_FAILURE',
      errorMessage: errorMessage
    }
  },
  getEventUserComments: function(){
    return {
      type: 'GET_EVENT_USER_COMMENTS',
    }
  },
  getEventUserCommentsSuccess: function(comments){
    return {
      type: 'GET_EVENT_USER_COMMENTS_SUCCESS',
      comments
    }
  },
  getEventUserCommentsFailure: function(errorMessage){
    return {
      type: 'GET_EVENT_USER_COMMENTS_FAILURE',
      errorMessage: errorMessage
    }
  },
  addEventUserComment: function(){
    return {
      type: 'ADD_EVENT_USER_COMMENT',
    }
  },
  addEventUserCommentSuccess: function(){
    return {
      type: 'ADD_EVENT_USER_COMMENT_SUCCESS',
    }
  },
  addEventUserCommentFailure: function(errorMessage){
    return {
      type: 'ADD_EVENT_USER_COMMENT_FAILURE',
      errorMessage: errorMessage
    }
  }
}

export default actions;
