import React, { Component } from 'react';
import { Link } from 'react-router';
import {IntlProvider, FormattedTime} from 'react-intl';

class EventItem extends Component {

  checkTickets(){
    if(this.props.event.IsSuspended)
    {
      return (<p>Buying tickets is <b>suspended</b>!</p>)
    }else if(this.props.event.IsClosed){
      return (<p>Event is <b>closed</b>!</p>)
    }
  }

  render(){
    return(
      <div className="program-row">
        <div className="forty">
          <div className="img-container">
            <Link to={"/events/" + this.props.event.Id} >
              <img className="img" src={this.props.event.Image.Content}/>
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
            <p>{this.props.event.Description}</p><br/><br/><br/>
            {this.checkTickets()}
          </div>
          <div className="details">
            <Link to={"/events/" + this.props.event.Id} className="btn btn-default btn-style-magenta">
              Details
            </Link>
          </div>
        </div>
        <div className="twenty">
          <div className="date">
            <IntlProvider locale="en">
                <FormattedTime
                  value={this.props.event.Date}
                  day="numeric"
                  month="long"
                  year="numeric"/>
            </IntlProvider>
          </div>
            <div className="eventbuttons">
              <button className="btn-eventroom">{this.props.event.Location.Name}</button>
            </div>
          </div>
        </div>
    )
  }
};

export default EventItem;
