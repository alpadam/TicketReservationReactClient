let eventReducer = function(eventList = {}, action) {
  switch (action.type) {
    case 'GET_EVENT_LIST':
    console.log('get_event_list')
    return Object.assign({}, eventList, {
      isFetching: true,
    });
    case 'GET_EVENT_LIST_SUCCESS':
      console.log(action.events)
      return Object.assign({}, eventList, {
        isFetching: false,
        errorMessage: '',
        events: action.events
      });
    case 'GET_EVENT_LIST_FAILURE':
    console.log(action);

      return Object.assign({}, eventList, {
        isFetching: false,
        errorMessage: action.errorMessage
      });

    default:
      return eventList;
  }
}

export default eventReducer;
