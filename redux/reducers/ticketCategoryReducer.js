let ticketCategoryReducer = function(ticketCategories = {}, action) {
  switch (action.type) {
    case 'GET_CATEGORY_LIST':
    return Object.assign({}, ticketCategories, {
      isFetching: true,
      errorMessage: '',
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
    case 'ADD_TICKET_CATEGORY':
      return Object.assign({}, ticketCategories, {
        isFetching: true,
        errorMessage: ''
      });
    case 'ADD_TICKET_CATEGORY_SUCCESS':
        ticketCategories.categories.push({
          Id: action.category.Id,
          Name: action.category.Name
        });
      return Object.assign({}, ticketCategories, {
        isFetching: false,
        errorMessage: ''
      });
    case 'ADD_TICKET_CATEGORY_FAILURE':
      return Object.assign({}, ticketCategories, {
        isFetching: false,
        errorMessage: action.errorMessage
      });
    case 'ERROR_HANDLED':
      return Object.assign({}, ticketCategories, {
        errorMessage: ''
      });
    default:
      return ticketCategories;
  }
}

export default ticketCategoryReducer;
