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
  }
}

export default actions;
