import React, { Component } from 'react';
import {IntlProvider, FormattedDate} from 'react-intl';
import EventTicketBuy from './EventTicketBuy';
import { connect } from 'react-redux';
import actions from '../redux/actions';

class EventTickets extends Component {

  checkIsAuthenticated(){
    if(!this.props.isLoggedIn){
      return (
      <div className="alert alert-danger" role="alert">
        <span className="glyphicon glyphicon-info-sign" aria-hidden="true"> </span>
        In order to buy tickets, please <b>log in</b>!
      </div>
      )
    }else if(this.props.isSuspended){
      return (
      <div className="alert alert-danger" role="alert">
        <span className="glyphicon glyphicon-info-sign" aria-hidden="true"> </span>
        Buying tickets is currently <b>suspended</b> for this event!
      </div>
      )
    }else{
      return(
        <div>
          <h2>Buy tickets</h2>
          <EventTicketBuy eventId={this.props.eventId} eventTickets={this.props.eventTickets} dispatch={this.props.dispatch}/>
        </div>
      )
    }
  }

  render(){
    return(
      <div className="row">
        <div className="col-lg-12">
          <h2>Event tickets</h2>
          <div className="col-lg-12">
            <ul id="eventTicketList">
              {this.props.eventTickets.map((eventTicket) => {
                  return <li key={eventTicket.Id}>{eventTicket.TicketCategory.Name}: <b>{eventTicket.Price}</b> HUF</li>
                })}
            </ul>
          </div>
          </div>
          <div className="col-lg-12">
            {this.checkIsAuthenticated()}
          </div>
      </div>
    )
  }
};

export default connect(null, actions)(EventTickets)
