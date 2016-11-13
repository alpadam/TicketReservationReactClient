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
      console.log('dispatch')
      this.props.dispatch(this.props.getEventList());

      return fetch('http://localhost:3253/Api/Event/GetEvents', request)
        .then(response => response.json().then(events => ({ events, response })))
        .then(({ events, response }) =>  {
          if (!response.ok) {
            var message = events.error_description;
            this.props.dispatch(this.props.getEventListFailure(message));
            return Promise.reject(events);
          } else {
            this.props.dispatch(this.props.getEventListSuccess(events));
          }
        }).catch(err => this.props.dispatch(this.props.getEventListFailure(err)));
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
      <div>
        <div className="jumbotron">
          <h1>Upcoming events</h1>
        </div>
          <EventSearchBar/>
          <br/>
          <div>
            {this.renderIsFetching()}
          </div>
      </div>
    )
  }
};

export default connect(null, actions)(EventList);
