import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import FormInput from '../FormInput';

class TicketCategoryAddModal extends Component {

    constructor(props){
      super(props);
      this.state = {
        isEditMode: false,
        id: '',
        nameInput: ''
      };
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.selectedCategory){
        this.setState({
          isEditMode: true,
          id: this.state.id !== '' ? this.state.id : nextProps.selectedCategory.Id,
          nameInput: this.state.nameInput !== '' ? this.state.nameInput : nextProps.selectedCategory.Name,
        });
      } else {
        this.setState({
          isEditMode: false,
          id: '',
          nameInput: '',
        });
      }
    }

    handleChangeInput(value, fieldName) {
      this.setState({
        [fieldName]: value
      });
    }

    handleSave() {
        let category = {
          Id: this.state.id,
          Name: this.state.nameInput
        };

        let url = 'http://localhost:3253/api/ticketcategory/Add';

        let request = {
          method: 'POST',
          headers: { 'Content-Type':'application/json',
                     'Authorization': 'Bearer ' + localStorage.getItem('access_token')},
          body: JSON.stringify(category)
        };

        if(this.state.isEditMode){
          request.method = 'PUT';
          url = 'http://localhost:3253/api/ticketcategory/Edit';
        }

        return dispatch => {

        if(this.state.isEditMode) {
          dispatch(this.props.editTicketCategory());
        } else {
          dispatch(this.props.addTicketCategory());
        }

        return fetch(url.toString(), request)
          .then(response => response.json())
          .then(json =>  {
            if (json.Message) {
              if(this.state.isEditMode) {
                dispatch(this.props.editTicketCategoryFailure(json.ExceptionMessage));
              } else {
                dispatch(this.props.addTicketCategoryFailure(json.ExceptionMessage));
              }
              return Promise.reject(json);
            } else {
              category.Id = json;

              if(this.state.isEditMode) {
                  this.props.editTicketCategorySuccess(category);
              } else {
                  this.props.addTicketCategorySuccess(category);
              }

              this.props.onHide();
            }
          }).catch(err => console.log(err));
        }
    }

    render() {
      return (
        <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-sm">Ticket category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Please add a new category name</h4>
            <FormInput name="nameInput" inputText={this.state.nameInput} className="form-control" placeholder="Category name" onValueChange={this.handleChangeInput.bind(this)} />
        </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.props.dispatch(this.handleSave())}>Save</Button>
          </Modal.Footer>
        </Modal>
      );
  }
};

export default connect(null, actions)(TicketCategoryAddModal);
