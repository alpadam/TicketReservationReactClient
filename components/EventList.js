import React, { Component } from 'react';
import EventItem from './EventItem';
import EventSearchBar from './EventSearchBar'
import { connect } from 'react-redux';
import actions from '../redux/actions';

class EventList extends Component {

  getEvents(event){

    let request = {
      method: 'GET',
      headers: { 'Content-Type':'application/x-www-form-urlencoded' }
    }

    console.log(request);

    return dispatch => {
      console.log('dispatch')
      this.props.dispatch(this.props.getEventList());

      return fetch('http://localhost:3253/Api/Event/GetEventList', request)
        .then(response => response.json().then(events => ({ events, response })))
        .then(({ events, response }) =>  {
          if (!response.ok) {
            var message = events.error_description;
            console.log(message);
            this.props.dispatch(this.props.getEventListFailure(message));
            return Promise.reject(events);
          } else {
            console.log(events);
            this.props.dispatch(this.props.getEventListSuccess(events));
          }
        }).catch(err => this.props.dispatch(this.props.getEventListFailure(err)));
    }
  };

  render(){
    return(
      <div>
        <div className="jumbotron">
          <h1>Upcoming events</h1>
        </div>
          <EventSearchBar/>
          <br/>
          <h2>Results</h2>
          <button onClick={(event) => this.props.dispatch(this.getEvents(event))} className="btn btn-primary">Get Events</button>
          <ul>
            {
                this.props.eventList.events.map((event) => {
                  return <EventItem key={event.id} event={event} actions={this.props.actions}/>
                })
            }
          </ul>
      </div>
    )
  }
};

export default connect(null, actions)(EventList);
