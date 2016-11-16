let hostLocationReducer = function(hostLocationList = {}, action) {
  switch (action.type) {
    case 'GET_HOST_LOCATION_LIST':
    return Object.assign({}, hostLocationList, {
      isFetching: true,
    });
    case 'GET_HOST_LOCATION_LIST_SUCCESS':
      return Object.assign({}, hostLocationList, {
        isFetching: false,
        errorMessage: '',
        hostLocations: action.hostLocations
      });
    case 'GET_HOST_LOCATION_LIST_FAILURE':
      return Object.assign({}, hostLocationReducer, {
        isFetching: false,
        errorMessage: action.errorMessage
      });

    default:
      return hostLocationList;
  }
}

export default hostLocationReducer;
