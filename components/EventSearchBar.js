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

        <label for="datePicker">Date</label>
        <input type="date" id="datePicker"/>

        <button className="btn btn-primary">Search</button>
      </div>
    )
  }
};

export default EventSearchBar;
