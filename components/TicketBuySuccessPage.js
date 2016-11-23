import React, { Component } from 'react';
import { Link } from 'react-router';

class TicketBuySuccessPage extends Component {

  render() {
    return (
      <div className="container">
        <h1>The tickets have been successfully bought!</h1>
        <p>An email was sent to you with the bought tickets! :)</p>
        <br/>
        <Link to="/">
          <button className="btn btn-danger" id="backToEventListBtn">
            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"/> Back to Events
          </button>
        </Link>
      </div>
    )
  }
}

export default TicketBuySuccessPage;
