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
      case 'ADD_HOST_LOCATION':
        return Object.assign({}, hostLocationList, {
          isFetching: true,
          errorMessage: ''
        });
      case 'ADD_HOST_LOCATION_SUCCESS':
        hostLocationList.hostLocations.push({
          Id: action.hostLocation.Id,
          Name: action.hostLocation.Name,
          Capacity: action.hostLocation.Capacity,
          Description: action.hostLocation.Description,
          Latitude: action.hostLocation.Latitude,
          Longitude: action.hostLocation.Longitude,
          Address: action.hostLocation.Address,
        });
        return Object.assign({}, hostLocationList, {
          isFetching: false,
          errorMessage: ''
        });
      case 'ADD_HOST_LOCATION_FAILURE':
        return Object.assign({}, hostLocationList, {
          isFetching: false,
          errorMessage: action.errorMessage ? action.errorMessage : action
        });
      case 'ERROR_HANDLED':
        return Object.assign({}, hostLocationList, {
          errorMessage: ''
        });
    default:
      return hostLocationList;
  }
}

export default hostLocationReducer;
