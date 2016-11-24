import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import LoadingComponent from './LoadingComponent';
import EventLocationDetails from './EventLocationDetails';
import EventComments from './EventComments';
import EventTickets from './EventTickets';
import {IntlProvider, FormattedTime} from 'react-intl';

class EventDetailedItem extends Component {

  componentWillMount(){
    var id = this.props.params.id;
    this.props.dispatch(this.getDetailedEvent(id))
    //this.props.dispatch(this.getEventComments(id))
  }

  getDetailedEvent(id){
    let request = {
      method: 'GET',
      headers: { 'Content-Type':'application/json'}
    }

    return dispatch => {
      dispatch(this.props.getEventDetails());

      return fetch('http://localhost:3253/api/event/' + id, request)
        .then(response => response.json().then(event => ({ event, response })))
        .then(({ event, response }) =>  {
          if (!response.ok) {
            var message = event.error_description;
            dispatch(this.props.getEventDetailsFailure(message));
            return Promise.reject(event);
          } else {
            return dispatch(this.props.getEventDetailsSuccess(event));
          }
        }).catch(err => dispatch(this.props.getEventDetailsFailure(err)));
    }
  }

  renderIsFetching(){
    if(this.props.eventDetails.isFetching){
      return <LoadingComponent/>
    }else{
      if(!this.props.eventDetails.errorMessage){
        var headerStyle = {
          backgroundImage: "url("+ this.props.eventDetails.event.Image.Content + ")"
        }
        
        return(
          <div>
            <div className="header" style={headerStyle}>
              <div className="container">
                  <h1 className="header-title">{this.props.eventDetails.event.Name}</h1>
              </div>
            </div>
            <div className="container" id="detailsContainer">
              <div className="row">
                <div className="sidebar col-sm-5 col-sm-push-7" id="detailsRightSide">
                  <EventLocationDetails Location={this.props.eventDetails.event.Location} />
                </div>
                <div className="program col-sm-7 col-sm-pull-5" id="detailsLeftSide">
                  <div className="eventDetails">
                    <div className="eventDate">
                      <span className="glyphicon glyphicon-calendar"> </span>
                      <b>
                        <IntlProvider locale="en">
                          <FormattedTime
                            value={this.props.eventDetails.event.Date}
                            day="numeric"
                            month="long"
                            year="numeric"/>
                        </IntlProvider>
                      </b>
                    </div>
                    <div className="col-lg-12">
                      {this.props.eventDetails.event.Description}
                    </div>
                  </div>
                  <EventTickets
                      dispatch={this.props.dispatch}
                      eventId={this.props.eventDetails.event.Id}
                      isLoggedIn={this.props.auth.isAuthenticated}
                      eventTickets={this.props.eventDetails.event.EventTickets}
                      IsSuspended={this.props.eventDetails.event.IsSuspended}
                      IsClosed={this.props.eventDetails.event.IsClosed}/>
                  <EventComments
                      dispatch={this.props.dispatch}
                      eventId={this.props.eventDetails.event.Id}
                      isLoggedIn={this.props.auth.isAuthenticated}
                      eventComments={this.props.eventComments}/>
                  <Link to="/">
                    <button className="btn btn-danger" id="backToEventListBtn">
                      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"/> Back
                    </button>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )
      }else{
        return(
          <div className="container">
            <h1>Error!</h1>
            <p>We are really sorry, event not found! :(</p>
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
  }

  render(){
    return(
      <div id="event-details">
        {this.renderIsFetching()}
      </div>
    )
  }
};

export default connect(null, actions)(EventDetailedItem)
