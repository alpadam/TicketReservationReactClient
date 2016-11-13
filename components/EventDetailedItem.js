import React, { Component } from 'react';
import { Link } from 'react-router';

class EventDetailedItem extends Component {

  componentWillMount(){
    this.props.dispatch(this.getEventDetails)
  }

  getEventDetails(){

  }

  render(){
    return( 
      <div>
        <h2>Event detailed item</h2>
        <Link to="/">
          <button>Return to event lists</button>
        </Link>
      </div>
    )
  }
};

export default EventDetailedItem;
