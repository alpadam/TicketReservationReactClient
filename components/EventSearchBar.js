import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import LoadingComponent from './LoadingComponent'

class EventSearchBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      HostLocationId : null,
      FromDate: '',
      ToDate: ''
    }
  }

  handleSearchButtonClick(event){
    event.preventDefault();
    this.props.dispatch(this.getEvents(this.state.HostLocationId, this.state.FromDate, this.state.ToDate));
  }

  componentWillMount(){
    this.props.dispatch(this.getEvents());
    this.props.dispatch(this.getHostLocations())
  }

  getEvents(hostLocationId = '', fromDate = '', toDate = ''){
    let body ={
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
        }).catch(err => dispatch(this.props.getEventListFailure(err)));
    }
  };

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
  }

  handleFromDateChange(date){
    this.setState({
      FromDate: date
    })
  }

  renderIsFetching(){
    if(this.props.hostLocationList.isFetching){
      return <LoadingComponent/>
    }else{
      return(
        <div>
          <h2>Search for Events</h2>
          <div className="panel panel-default" id="eventSearchBar">
            <div className="panel-body">
              <label for="locations">Locations</label>
              <select id="locations"
                value={this.state.HostLocationId || ''}
                onChange={e => this.setState({ HostLocationId: e.target.value || null })}>
                  <option value="">Select location!</option>
                {
                  this.props.hostLocationList.hostLocations.map((hostLocation) => {
                    return <option key={hostLocation.Id} value={hostLocation.Id}>{hostLocation.Name}</option>
                  })
                }
              </select>

              <label for="fromDate">From date</label>
              <input id="fromDate" type="date"
                 value={this.state.FromDate || ''}
                 onChange={e => this.setState({ FromDate: e.target.value || null })}
                 />

              <label for="toDate">To date</label>
                <input id="toDate" type="date"
                   value={this.state.ToDate || ''}
                   onChange={e => this.setState({ ToDate: e.target.value || null })}
                   />

                 <button id="searchBtn" onClick={(event) => this.handleSearchButtonClick(event)} className="btn btn-primary">Search</button>
             </div>
         </div>
      </div>
    )
    }
  }

  render(){

    return(
      <div>
        {this.renderIsFetching()}
      </div>
    )
  }
};

export default connect(null, actions)(EventSearchBar)
