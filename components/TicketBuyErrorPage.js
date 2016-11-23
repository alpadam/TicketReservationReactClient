import React, { Component } from 'react';
import { Link } from 'react-router';

class TicketBuyErrorPage extends Component {

  render() {
    return (
      <div className="container">
        <h1>Buy error</h1>
        <p>We are really sorry, something went wrong during the buy process :(</p>
        <p>Check the console output!</p>
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

export default TicketBuyErrorPage;
