let eventDetailsReducer = function(eventDetails = {}, action) {
  switch (action.type) {
    case 'GET_EVENT_DETAILS':
    return Object.assign({}, eventDetails, {
      isFetching: true,
    });
    case 'GET_EVENT_DETAILS_SUCCESS':
      return Object.assign({}, eventDetails, {
        isFetching: false,
        errorMessage: '',
        event: action.event
      });
    case 'GET_EVENT_DETAILS_FAILURE':
      return Object.assign({}, eventDetails, {
        isFetching: false,
        errorMessage: action.errorMessage
      });
    case 'BUY_RESERVED_TICKETS':
    return Object.assign({}, eventDetails, {
      isFetching: true,
    });
    case 'BUY_RESERVED_TICKETS_SUCCESS':
      return Object.assign({}, eventDetails, {
        isFetching: false,
        errorMessage: '',
      });
    case 'BUY_RESERVED_TICKETS_FAILURE':
      return Object.assign({}, eventDetails, {
        isFetching: false,
        errorMessage: action.errorMessage
      });


    default:
      return eventDetails;
  }
}

export default eventDetailsReducer;
