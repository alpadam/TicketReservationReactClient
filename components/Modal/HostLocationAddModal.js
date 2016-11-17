import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import FormInput from '../FormInput';

class HostLocationAddModal extends Component {

    constructor(props){
      super(props);
      this.state = {
        nameInput: '',
        capacity: '',
        description: '',
        latitude: '',
        longitude: '',
        address: ''
      };
    }

    handleChangeInput(value, fieldName) {
      this.setState({
        [fieldName]: value
      });
    }

    handleSave() {
        let hostLocation = {
          Name: this.state.nameInput,
          Capacity: this.state.capacity,
          Description: this.state.description,
          Latitude: this.state.latitude,
          Longitude: this.state.longitude,
          Address: this.state.address
        };

        let request = {
          method: 'POST',
          headers: { 'Content-Type':'application/json',
                     'Authorization': 'Bearer ' + localStorage.getItem('access_token')},
          body: JSON.stringify(hostLocation)
        };

        return dispatch => {

        dispatch(this.props.addHostLocation());

        return fetch('http://localhost:3253/api/hostlocation/Add', request)
          .then(response => response.json())
          .then(json =>  {
            if (json.Message) {
              dispatch(this.props.addHostLocationFailure(json.ExceptionMessage));
              return Promise.reject(json);
            } else {
              hostLocation.Id = json;
              this.props.addHostLocationSuccess(hostLocation);
              this.props.onHide();
            }
          }).catch(err => dispatch(this.props.addHostLocationFailure(err)));
        }
    }

    render() {
      return (
        <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-sm">Host location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Please add a new host location</h4>
            <FormInput name="nameInput" className="form-control" placeholder="Host location name" onValueChange={this.handleChangeInput.bind(this)} />
            <FormInput name="capacity" className="form-control" placeholder="Capacity" onValueChange={this.handleChangeInput.bind(this)} />
            <FormInput name="description" className="form-control" placeholder="Description" onValueChange={this.handleChangeInput.bind(this)} />
            <FormInput name="latitude" className="form-control" placeholder="Latitude" onValueChange={this.handleChangeInput.bind(this)} />
            <FormInput name="longitude" className="form-control" placeholder="Longitude" onValueChange={this.handleChangeInput.bind(this)} />
            <FormInput name="address" className="form-control" placeholder="Address" onValueChange={this.handleChangeInput.bind(this)} />
        </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.props.dispatch(this.handleSave())}>Save</Button>
          </Modal.Footer>
        </Modal>
      );
  }
};

export default connect(null, actions)(HostLocationAddModal);
