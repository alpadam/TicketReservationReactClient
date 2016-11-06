import React, { Component } from 'react';

class EventItem extends Component {

//TODO: dizájn
  render(){
    return(
      <li>
        <div>{this.props.event.EventId}</div>
        <div>{this.props.event.Name}</div>
        <div>{this.props.event.Description}</div>
        <div>{this.props.event.HostLocation}</div>
        <div>{this.props.event.Date}</div>
        <div>{this.props.event.IsSuspended}</div>
      </li>
    )
  }
};

export default EventItem;
