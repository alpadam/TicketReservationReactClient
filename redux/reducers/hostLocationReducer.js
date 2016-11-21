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
          Image: {
            Content: action.hostLocation.Image.Content
          }
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
      case 'EDIT_HOST_LOCATION':
        return Object.assign({}, hostLocationList, {
          isFetching: true,
          errorMessage: ''
        });
      case 'EDIT_HOST_LOCATION_SUCCESS':
        hostLocationList.hostLocations = hostLocationList.hostLocations.filter(function(location) {
            if(location.Id === action.hostLocation.Id) {
              location.Id = action.hostLocation.Id;
              location.Name = action.hostLocation.Name;
              location.Capacity = action.hostLocation.Capacity;
              location.Description = action.hostLocation.Description;
              location.Latitude = action.hostLocation.Latitude;
              location.Longitude = action.hostLocation.Longitude;
              location.Address = action.hostLocation.Address;
              location.Image.Id = action.hostLocation.Image.Id;
              location.Image.Content = action.hostLocation.Image.Content;
            };
            return location;
        });
        return Object.assign({}, hostLocationList, {
          isFetching: false,
          errorMessage: ''
        });
      case 'EDIT_HOST_LOCATION_FAILURE':
        return Object.assign({}, hostLocationList, {
          isFetching: false,
          errorMessage: action.errorMessage ? action.errorMessage : action
        });
      case 'DELETE_HOST_LOCATION':
        return Object.assign({}, hostLocationList, {
          isFetching: true,
          errorMessage: ''
        });
      case 'DELETE_HOST_LOCATION_SUCCESS':
        hostLocationList.hostLocations = hostLocationList.hostLocations.filter(function(location) {
            return location.Id !== action.id;
        });
        return Object.assign({}, hostLocationList, {
          isFetching: false,
          errorMessage: ''
        });
      case 'DELETE_HOST_LOCATION_FAILURE':
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
