import React, { Component } from 'react';
import { Link } from 'react-router';

class EventItem extends Component {

  render(){
    return(
      <div className="program-row">
        <div className="forty">
          <div className="img-container">
            <Link to={"/events/" + this.props.event.Id} >
              <img className="img" src="/public/img/concert.jpg"/>
            </Link>
          </div>
        </div>
        <div className="forty-text">
          <div className="title">
            <Link to={"/events/" + this.props.event.Id} >
              {this.props.event.Name}
            </Link>
          </div>
          <div className="description">
            <p>{this.props.event.Description}</p>
          </div>
          <div className="details">
              Details
            </Link>
          </div>
        </div>
        <div className="twenty">
          <div className="date">{this.props.event.Date}</div>
            <div className="eventbuttons">
              <button className="btn-eventroom">{this.props.event.Location.Name}</button>
              <button className="btn-tonight">Today!</button>
            </div>
          </div>
        </div>
    )
  }
};

export default EventItem;
