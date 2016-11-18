import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';

import HostLocationAddModal from './Modal/HostLocationAddModal';
import ErrorModal from './Modal/ErrorModal';

class HostLocationEditList extends Component {

  constructor(props){
    super(props);
    props.dispatch(this.getHostLocations());
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
        .then(response => response.json())
        .then(json =>  {
          if (json.Message) {
            dispatch(this.props.getHostLocationListFailure(json.ExceptionMessage));
            return Promise.reject(json);
          } else {
            return dispatch(this.props.getHostLocationListSuccess(json));
          }
          }).catch(err => dispatch(this.props.getHostLocationListFailure(err)));
    }
  }

  handleDelete(id) {

      let request = {
        method: 'DELETE',
        headers: { 'Content-Type':'application/json',
                   'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
      };

      return dispatch => {

      dispatch(this.props.deleteHostLocation());

      return fetch('http://localhost:3253/api/hostlocation/'+ id, request)
        .then(response =>  {
          if (!response.ok) {
            dispatch(this.props.deleteHostLocationFailure(response.statusText));
            return Promise.reject(response);
          } else {
            this.props.deleteHostLocationSuccess(id);
          }
        }).catch(err => dispatch(this.props.deleteHostLocationFailure(err)));
      }
  }

  render(){
    return(
        <div className="container">

          <ErrorModal show={this.props.hostLocationList.errorMessage != ''} errorMessage={this.props.hostLocationList.errorMessage} onHide={() => {this.setState({ showModal: false }); this.props.dispatch(this.props.handleError());}} />
          <HostLocationAddModal dispatch={this.props.dispatch} show={this.state.showModal && this.props.hostLocationList.errorMessage === ''} onHide={() => this.setState({ showModal: false })} />

          <div className="jumbotron">
            <h1>Host locations</h1>
          </div>
          <button onClick={()=>this.setState({ showModal: true })} className="btn btn-primary">Add new host location</button>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Capacity</th>
                <th>Description</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Address</th>
                <th></th>
              </tr>
              {
                  this.props.hostLocationList.hostLocations.map((location) => {
                    return (
                      <tr>
                        <td>{location.Id}</td>
                        <td>{location.Name}</td>
                        <td>{location.Capacity}</td>
                        <td>{location.Description}</td>
                        <td>{location.Latitude}</td>
                        <td>{location.Longitude}</td>
                        <td>{location.Address}</td>
                        <td><button onClick={()=> this.props.dispatch(this.handleDelete(location.Id))} className="btn btn-danger">Delete</button></td>
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

export default connect(null, actions)(HostLocationEditList);
