import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import FormInput from '../FormInput';
import ImageUpload from '../ImageUpload';

class HostLocationAddModal extends Component {
    constructor(props){
      super(props);
      this.state = {
        isEditMode: false,
        id: '',
        nameInput: '',
        capacity: '',
        description: '',
        latitude: '',
        longitude: '',
        address: '',
        image: ''
      };
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.selectedLocation){

        if(!nextProps.selectedLocation.Image){
          nextProps.selectedLocation.Image = {
            Content: ''
          }
        }

        this.setState({
          isEditMode: true,
          id: this.state.id !== '' ? this.state.id : nextProps.selectedLocation.Id,
          nameInput: this.state.nameInput !== '' ? this.state.nameInput : nextProps.selectedLocation.Name,
          capacity: this.state.capacity !== '' ? this.state.capacity : nextProps.selectedLocation.Capacity,
          description: this.state.description !== '' ? this.state.description : nextProps.selectedLocation.Description,
          latitude: this.state.latitude !== '' ? this.state.latitude : nextProps.selectedLocation.Latitude,
          longitude: this.state.longitude !== '' ? this.state.longitude : nextProps.selectedLocation.Longitude,
          address: this.state.address !== '' ? this.state.address : nextProps.selectedLocation.Address,
          image: this.state.image !== '' ? this.state.image : nextProps.selectedLocation.Image.Content
        });
      } else {
        this.setState({
          isEditMode: false,
          id: '',
          nameInput: '',
          capacity: '',
          description: '',
          latitude: '',
          longitude: '',
          address: '',
          image: ''
        });
      }
    }

    handleChangeInput(value, fieldName) {
      this.setState({
        [fieldName]: value
      });
    }

    handleSave() {
        let hostLocation = {
          Id: this.state.id,
          Name: this.state.nameInput,
          Capacity: this.state.capacity,
          Description: this.state.description,
          Latitude: this.state.latitude,
          Longitude: this.state.longitude,
          Address: this.state.address,
          Image: {
            Content: this.state.image
          }
        };

        let url = 'http://localhost:3253/api/hostlocation/Add';
        let request = {
          method: 'POST',
          headers: {  'Content-Type':'application/json',
                      'enctype': 'multipart/form-data',
                     'Authorization': 'Bearer ' + localStorage.getItem('access_token')},
          body: JSON.stringify(hostLocation)
        };

        if(this.state.isEditMode){
          request.method = 'PUT';
          url = 'http://localhost:3253/api/hostlocation/Edit';
        }

        return dispatch => {

        if(this.state.isEditMode) {
          dispatch(this.props.editHostLocation());
        } else {
          dispatch(this.props.addHostLocation());
        }

        return fetch(url.toString(), request)
          .then(response => response.json())
          .then(json =>  {
            if (json.Message) {
              if(this.state.isEditMode) {
                dispatch(this.props.editHostLocationFailure(json.ExceptionMessage));
              } else {
                dispatch(this.props.addHostLocationFailure(json.ExceptionMessage));
              }
              return Promise.reject(json);
            } else {
              hostLocation.Id = json;

              if(this.state.isEditMode) {
                  this.props.editHostLocationSuccess(hostLocation);
              } else {
                  this.props.addHostLocationSuccess(hostLocation);
              }

              this.props.onHide();
            }
          }).catch(err => dispatch(this.props.addHostLocationFailure(err)));
        }
    }

    render() {
      return (
        <Modal {...this.props} aria-labelledby="contained-modal-title-sm">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-sm">Host location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Please add a new host location</h4>
            <FormInput name="nameInput" inputText={this.state.nameInput} className="form-control" placeholder="Host location name" onValueChange={this.handleChangeInput.bind(this)} />
            <FormInput name="capacity" inputText={this.state.capacity} className="form-control" placeholder="Capacity" onValueChange={this.handleChangeInput.bind(this)} />
            <FormInput name="description" inputText={this.state.description} className="form-control" placeholder="Description" onValueChange={this.handleChangeInput.bind(this)} />
            <FormInput name="latitude" inputText={this.state.latitude} className="form-control" placeholder="Latitude" onValueChange={this.handleChangeInput.bind(this)} />
            <FormInput name="longitude" inputText={this.state.longitude} className="form-control" placeholder="Longitude" onValueChange={this.handleChangeInput.bind(this)} />
            <FormInput name="address" inputText={this.state.address} className="form-control" placeholder="Address" onValueChange={this.handleChangeInput.bind(this)} />
            <ImageUpload name="image" inputImage={this.state.image} onValueChange={this.handleChangeInput.bind(this)}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.props.dispatch(this.handleSave())}>Save</Button>
          </Modal.Footer>
        </Modal>
      );
  }
};

export default connect(null, actions)(HostLocationAddModal);
