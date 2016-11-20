import React, { Component } from 'react';
import LocationGoogleMap from "./LocationGoogleMap";

class EventLocationDetails extends Component {

  constructor(props){
    super(props)
    this.state = {
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: `Taiwan`,
        defaultAnimation: 2,
      }],
    }
  }

  handleMapClick(event) {
    let { markers } = this.state;
    markers = update(markers, {
      $push: [
        {
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });
    this.setState({ markers });
  }

  handleMarkerRightclick(index, event) {
    let { markers } = this.state;
    markers = update(markers, {
      $splice: [
        [index, 1],
      ],
    });
    this.setState({ markers });
  }

  render(){
    return(
      <div className="serviceinfo row hidden-xs">
          <h2 className="locationName">{this.props.Location.Name}</h2>
          <img src="/public/img/concert.jpg" />
          <div className="col-sm-12" >
            {this.props.Location.Description}
            </div>
          <div className="col-sm-12">
                <span className="glyphicon glyphicon-user"></span> {this.props.Location.Capacity} people <br/>
                <span className="glyphicon glyphicon-home"></span> {this.props.Location.Address}
                <LocationGoogleMap
                  markers={this.state.markers}
                  onMapClick={this.handleMapClick}
                  onMarkerRightclick={this.handleMarkerRightclick}
                />
          </div>
      </div>
    )
  }
};

export default EventLocationDetails;
