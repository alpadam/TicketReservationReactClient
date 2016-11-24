let eventReducer = function(eventList = {}, action) {
  switch (action.type) {
    case 'GET_EVENT_LIST':
      return Object.assign({}, eventList, {
        isFetching: true,
      });
    case 'GET_EVENT_LIST_SUCCESS':
      return Object.assign({}, eventList, {
        isFetching: false,
        errorMessage: '',
        events: action.events
      });
    case 'GET_EVENT_LIST_FAILURE':
      return Object.assign({}, eventList, {
        isFetching: false,
        errorMessage: action.errorMessage
      });
    case 'ADD_EVENT':
      return Object.assign({}, eventList, {
        isFetching: true,
      });
    case 'ADD_EVENT_SUCCESS':
      // refresh with async call in handle method...
      return Object.assign({}, eventList, {
        isFetching: false,
        errorMessage: ''
      });
    case 'ADD_EVENT_FAILURE':
      return Object.assign({}, eventList, {
        isFetching: false,
        errorMessage: action.errorMessage
      });
    case 'CLOSE_EVENT':
      return Object.assign({}, eventList, {
        isFetching: true,
      });
    case 'CLOSE_EVENT_SUCCESS':
      eventList.events = eventList.events.filter(function(event) {
          return event.Id !== action.id;
      });
      return Object.assign({}, eventList, {
        isFetching: false,
        errorMessage: ''
      });
    case 'CLOSE_EVENT_FAILURE':
      return Object.assign({}, eventList, {
        isFetching: false,
        errorMessage: action.errorMessage
      });
      case 'SUSPEND_EVENT':
        return Object.assign({}, eventList, {
          isFetching: true,
        });
      case 'SUSPEND_EVENT_SUCCESS':
        eventList.events = eventList.events.filter(function(event) {
            if(event.Id === action.id) {
              event.IsSuspended = !event.IsSuspended;
            }
            return event;
        });
        return Object.assign({}, eventList, {
          isFetching: false,
          errorMessage: ''
        });
      case 'SUSPEND_EVENT_FAILURE':
        return Object.assign({}, eventList, {
          isFetching: false,
          errorMessage: action.errorMessage
        });
      case 'ERROR_HANDLED':
        return Object.assign({}, eventList, {
          errorMessage: ''
        });
    default:
      return eventList;
  }
}

export default eventReducer;
