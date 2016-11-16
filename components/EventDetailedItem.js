import React, { Component } from 'react';
import { Link } from 'react-router';

class EventDetailedItem extends Component {

  componentWillMount(){
    this.props.dispatch(this.getEventDetails)
    var id = this.props.params.id; 
    console.log(id)
  }

  getEventDetails(){

  }

  render(){
    return(
      <div id="event-details">
        <div className="header">
              <h1 className="header-title">TEst</h1>
        </div>
        <div className="container">

        </div>
        <Link to="/">
          <button className="btn btn-primary">Return to event lists</button>
        </Link>
      </div>
    )
  }
};

export default EventDetailedItem;
