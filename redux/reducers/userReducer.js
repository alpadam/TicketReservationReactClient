let userReducer = function(userDetails = {}, action) {
  switch (action.type) {
    case 'GET_USER_DETAILS':
      return Object.assign({}, userDetails, {
        isFetching: true,
      });
    case 'GET_USER_DETAILS_SUCCESS':
      return Object.assign({}, userDetails, {
        isFetching: false,
        errorMessage: '',
        user: action.user
      });
    case 'GET_USER_DETAILS_FAILURE':
      return Object.assign({}, userDetails, {
        isFetching: false,
        errorMessage: action.errorMessage
      });
    default:
      return userDetails;
  }
}

export default userReducer;
