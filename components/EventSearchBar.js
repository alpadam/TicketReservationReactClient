import React, { Component } from 'react';

class EventSearchBar extends Component {

  render(){
    return(
      <div>
      <h2>Search for events</h2>
        <label for="hostLocation">Location</label>
        <select id="hostLocation">
            <option>Budapest Park</option>
            <option>Akvárium</option>
        </select>

        <label for="fromDate">From</label>
        <input type="date" id="fromdate"/>

          <label for="toDate">To</label>
          <input type="date" id="toDate"/>

        <button className="btn btn-primary">Search</button>
      </div>
    )
  }
};

export default EventSearchBar;
