import React, { Component } from 'react';

class EventTicketRow extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      this.props.eventTickets.map((et) => {
        return (
          <li className="list-group-item">
            {et.TicketCategory.Name} - {et.Price}Ft (Quantity: {et.Quantity})
          </li>
        );
    })
  );
  }
}

export default EventTicketRow;
