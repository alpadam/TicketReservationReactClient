import React, { Component } from 'react';
import EventItem from './EventItem';
import EventSearchBar from './EventSearchBar'
import { connect } from 'react-redux';
import actions from '../redux/actions';
import LoadingComponent from './LoadingComponent'

class EventList extends Component {

  renderIsFetching(){
    if(this.props.eventList.isFetching){
      return <LoadingComponent/>
    }else{
      if(this.props.eventList.events.length === 0 ){
        return(<h2>No events were found!</h2>)
      }
      else{
        return(
          this.props.eventList.events.map((event) => {
            return <EventItem key={event.Id} event={event} actions={this.props.actions}/>
          })
        )
      }
    }
  }

  render(){
    return(
      <div className="container">
          <div className="row">
            <EventSearchBar dispatch={this.props.dispatch} hostLocationList={this.props.hostLocationList}/>
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
