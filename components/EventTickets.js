import React, { Component } from 'react';
import {IntlProvider, FormattedDate} from 'react-intl';

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
        <div>buy tickets !</div>
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
          <div className="col-lg-12">
            {this.checkIsAuthenticated()}
          </div>
        </div>
      </div>
    )
  }
};

export default EventTickets
