let commentReducer = function(eventComments = {}, action) {
  switch (action.type) {
    case 'GET_EVENT_USER_COMMENTS':
      return Object.assign({}, eventComments, {
        isFetching: true,
    });
    case 'GET_EVENT_USER_COMMENTS_SUCCESS':
      return Object.assign({}, eventComments, {
        isFetching: false,
        errorMessage: '',
        comments: action.comments
      });
    case 'GET_EVENT_USER_COMMENTS_FAILURE':
      return Object.assign({}, eventComments, {
        isFetching: false,
        errorMessage: action.errorMessage
      });
    case 'ADD_EVENT_USER_COMMENT':
      return Object.assign({}, eventComments, {
        isFetching: true,
    });
    case 'ADD_EVENT_USER_COMMENT_SUCCESS':
      return Object.assign({}, eventComments, {
        isFetching: false,
        errorMessage: '',
    });
    case 'ADD_EVENT_USER_COMMENT_FAILURE':
      return Object.assign({}, eventComments, {
        isFetching: false,
        errorMessage: action.errorMessage
    });
    default:
      return eventComments;
  }
}

export default commentReducer;
