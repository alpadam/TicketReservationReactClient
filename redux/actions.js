let actions = {
  addTodo: function(text){
    return {
      type: 'ADD_TODO',
      text: text
    }
  },
  completeTodo: function(todoId) {
    return {
      type: 'COMPLETE_TODO',
      todoId: todoId
    }
  },
  deleteTodo: function(todoId) {
    return {
      type: 'DELETE_TODO',
      todoId: todoId
    }
  },
  createNewUserId: function(){
    return{
      type: 'CREATE_USER_ID',
      id: Math.round(Math.random() * 100)
    }
  },
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
