let ticketCategoryReducer = function(ticketCategories = {}, action) {
  switch (action.type) {
    case 'GET_CATEGORY_LIST':
    return Object.assign({}, ticketCategories, {
      isFetching: true,
    });
    case 'GET_CATEGORY_LIST_SUCCESS':
      return Object.assign({}, ticketCategories, {
        isFetching: false,
        errorMessage: '',
        categories: action.categories
      });
    case 'GET_CATEGORY_LIST_FAILURE':
      return Object.assign({}, ticketCategories, {
        isFetching: false,
        errorMessage: action.errorMessage
      });
    default:
      return ticketCategories;
  }
}

export default ticketCategoryReducer;
