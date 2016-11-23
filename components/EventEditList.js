import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';

import EventAddModal from './Modal/EventAddModal';
import ErrorModal from './Modal/ErrorModal';
import EventTicketRow from './EventTicketRow';

import {IntlProvider, FormattedTime} from 'react-intl';

class EventEditList extends Component {

  constructor(props){
    super(props);
    props.dispatch(this.getEvents());
    props.dispatch(this.getHostLocations());
    props.dispatch(this.getCategories());
    this.state = {
        showModal: false
    };
  }

  getHostLocations(){
    let request = {
      method: 'GET',
      headers: { 'Content-Type':'application/json'}
    }
    return dispatch => {
      dispatch(this.props.getHostLocationList());
      return fetch('http://localhost:3253/api/hostlocation/', request)
        .then(response => response.json().then(hostLocations => ({ hostLocations, response })))
        .then(({ hostLocations, response }) =>  {
          if (!response.ok) {
            var message = hostLocations.error_description;
            dispatch(this.props.getHostLocationListFailure(message));
            return Promise.reject(hostLocations);
          } else {
            return dispatch(this.props.getHostLocationListSuccess(hostLocations));
          }
        }).catch(err => dispatch(this.props.getHostLocationListFailure(err)));
    }
  };

  getCategories(){
    let request = {
      method: 'GET',
      headers: { 'Content-Type':'application/x-www-form-urlencoded' }
    }

    return dispatch => {
      dispatch(this.props.getTicketCategoriesList());
      return fetch('http://localhost:3253/api/ticketcategory', request)
        .then(response => response.json().then(category => ({ category, response })))
        .then(({ category, response }) =>  {
          if (!response.ok) {
            dispatch(this.props.getTicketCategoriesFailure(category));
            return Promise.reject(category);
          } else {
            dispatch(this.props.getTicketCategoriesSuccess(category));
          }
        }).catch(err => dispatch(this.props.getTicketCategoriesFailure(err)));
    }
  };

  getEvents(hostLocationId = '', fromDate = '', toDate = '') {
    let body = {
      HostLocationId : hostLocationId,
      FromDate: fromDate,
      ToDate: toDate
    }

    let request = {
      method: 'POST',
      headers: { 'Content-Type':'application/json'},
      body: JSON.stringify(body)
    }

    return dispatch => {
      dispatch(this.props.getEventList());

      return fetch('http://localhost:3253/api/event/', request)
        .then(response => response.json().then(events => ({ events, response })))
        .then(({ events, response }) =>  {
          if (!response.ok) {
            var message = events.error_description;
            dispatch(this.props.getEventListFailure(message));
            return Promise.reject(events);
          } else {
            return dispatch(this.props.getEventListSuccess(events));
          }
        }).catch(err => this.props.dispatch(this.props.getEventListFailure(err)));
    }
  };

  handleClose(id) {
      let request = {
        method: 'POST',
        headers: { 'Content-Type':'application/json',
                   'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
      };

      return dispatch => {
      dispatch(this.props.closeEvent());
      return fetch('http://localhost:3253/api/event/close?eventId='+ id, request)
        .then(response =>  {
          if (!response.ok) {
            console.log("almafa");
            dispatch(this.props.closeEventFailure(response.statusText));
            return Promise.reject(response);
          } else {
            this.props.closeEventSuccess(id);
          }
        }).catch(err => console.log(err));
      }
  }

  handleSuspend(id) {
      let request = {
        method: 'POST',
        headers: { 'Content-Type':'application/json',
                   'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
      };

      return dispatch => {
      dispatch(this.props.suspendEvent());
      return fetch('http://localhost:3253/api/event/suspend?eventId='+ id, request)
        .then(response =>  {
          if (!response.ok) {
            dispatch(this.props.suspendEventFailure(response.statusText));
            return Promise.reject(response);
          } else {
            this.props.suspendEventSuccess(id);
          }
        }).catch(err => dispatch(this.props.suspendEventFailure(err)));
      }
  }

  render(){
    return(
        <div className="container">

          <ErrorModal show={this.props.eventList.errorMessage != ''} errorMessage={this.props.eventList.errorMessage} onHide={() => {this.setState({ showModal: false}); this.props.dispatch(this.props.handleError());}} />
          <EventAddModal eventRefresh={this.getEvents.bind(this)} dispatch={this.props.dispatch} categories={this.props.ticketCategories.categories} hostLocations={this.props.hostLocationList.hostLocations} show={this.state.showModal && this.props.eventList.errorMessage === ''} onHide={() => this.setState({ showModal: false, selectedEvent: null})} />

          <div className="jumbotron">
            <h1>Events</h1>
          </div>
          <button onClick={()=>this.setState({ showModal: true, selectedEvent: null})} className="btn btn-primary">Add new event</button>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Date</th>
                <th>Event tickets</th>
                <th></th>
                <th></th>
              </tr>
              {
                this.props.eventList.events.map((event) => {
                  return (
                    <tr>
                      <td>{event.Id}</td>
                      <td>{event.Name}</td>
                      <td>{event.Description}</td>
                      <td>{event.Location.Name}</td>
                      <td>
                        <IntlProvider locale="en">
                          <FormattedTime value={event.Date} day="numeric" month="numeric" year="numeric"/>
                        </IntlProvider>
                      </td>
                      <td>
                        <ul>
                          {
                            event.EventTickets.map((et) => {
                              return (
                                <li>
                                  {et.TicketCategory.Name} > {et.Price}Ft (Quantity: {et.Quantity})
                                </li>
                              );
                            })
                          }
                        </ul>
                      </td>
                      <td><button onClick={()=> this.props.dispatch(this.handleSuspend(event.Id))} className="btn btn-warning">Suspend</button></td>
                      <td><button onClick={()=> this.props.dispatch(this.handleClose(event.Id))} className="btn btn-danger">Close</button></td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
    );
  }
};

export default connect(null, actions)(EventEditList);
