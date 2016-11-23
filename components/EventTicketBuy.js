import React, { Component } from 'react';
import actions from '../redux/actions';
import { connect } from 'react-redux';
import FormInputNumber from './FormInputNumber';
import { browserHistory } from 'react-router';


class EventTicketBuy extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  handleChangeInput(value, fieldName) {
    this.setState({
      [fieldName]: value
    });
  }

  handleBuyTickets() {
    var reservedTickets = [];

    for (var key in this.state) {
      console.log(key, this.state[key]);
      reservedTickets.push({
        EventTicketId : key,
        Quantity : this.state[key]
      })
    };

    console.log(reservedTickets);

    let request = {
      method: 'POST',
      headers: { 'Content-Type':'application/json',
                 'Authorization': 'Bearer ' + localStorage.getItem('access_token')},
      body: JSON.stringify(reservedTickets)
    };

    return dispatch => {

    dispatch(this.props.buyReservedTickets());

    return fetch('http://localhost:3253/api/event/BuyReservedTickets' + '?eventId=' + this.props.eventId, request)
      .then(response => response.json())
      .then(json =>  {
        if (json.Message) {
          dispatch(this.props.buyReservedTicketsFailure(json.ExceptionMessage));
          return Promise.reject(json);
          browserHistory.push('/buyError');
        } else {
          this.props.buyReservedTicketsSuccess();
          //this.setState({ Text: ''});
          //return this.props.dispatch(this.getEventDetails(this.props.eventId));
          browserHistory.push('/buySuccess');
       }
    }).catch(err => {
      dispatch(this.props.buyReservedTicketsFailure(err));
      browserHistory.push('/buyError');
    });
   }
  }

  render(){
    return(
      <div>
        <div className="col-lg-12">
          {this.props.eventTickets.map((eventTicket) => {
            var remainTicket = eventTicket.Quantity - eventTicket.SoldQuantity;
              return (
                <div>
                  <span>Quantity for <b>{eventTicket.TicketCategory.Name}</b>  (Sold: {eventTicket.SoldQuantity} tickets / Left: {remainTicket} tickets)
                    <FormInputNumber id={eventTicket.Id} min="0" max={remainTicket} name={eventTicket.Id} className="form-control"  onValueChange={this.handleChangeInput.bind(this)} /></span>
                </div>
                )
          })}
          <button id="buyTicketsBtn" className="btn btn-primary" onClick={() => this.props.dispatch(this.handleBuyTickets())}>
            <span className="glyphicon glyphicon-usd" aria-hidden="true"/> Buy
          </button>
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(EventTicketBuy)
