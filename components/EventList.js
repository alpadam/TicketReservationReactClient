import React, { Component } from 'react';
import EventItem from './EventItem';
import EventSearchBar from './EventSearchBar'
import { connect } from 'react-redux';
import actions from '../redux/actions';

class EventList extends Component {

  componentWillMount(){
    this.props.dispatch(this.getEvents());
  }

  getEvents(){
    let request = {
      method: 'GET',
      headers: { 'Content-Type':'application/x-www-form-urlencoded' }
    }

    return dispatch => {
      dispatch(this.props.getEventList());

      return fetch('http://localhost:3253/api/event', request)
        .then(response => response.json().then(events => ({ events, response })))
        .then(({ events, response }) =>  {
          if (!response.ok) {
            var message = events.error_description;
            dispatch(this.props.getEventListFailure(message));
            return Promise.reject(events);
          } else {
            return dispatch(this.props.getEventListSuccess(events));
          }
        }).catch(err => dispatch(this.props.getEventListFailure(err)));
    }
  };

  renderIsFetching(){
    if(this.props.eventList.isFetching){
      return (<h2>Loading...</h2>)
    }else{
      return(
        this.props.eventList.events.map((event) => {
          return <EventItem key={event.Id} event={event} actions={this.props.actions}/>
        })
      )
    }
  }

  render(){
    return(
      <div className="container">
          <div className="row">
            <EventSearchBar/>
          </div>
          <br/>
          <div className="row">
            {this.renderIsFetching()}
          </div>
      </div>
    )
  }
};

export default connect(null, actions)(EventList);
