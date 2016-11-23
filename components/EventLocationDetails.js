import React, { Component } from 'react';
import LocationGoogleMap from "./LocationGoogleMap";

class EventLocationDetails extends Component {

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
                  latitude={this.props.Location.Latitude}
                  longitude={this.props.Location.Longitude}
                  name = {this.props.Location.Name}
                />
          </div>
      </div>
    )
  }
};

export default EventLocationDetails;
