import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import FormInput from '../FormInput';

class TicketCategoryAddModal extends Component {

    constructor(props){
      super(props);
      this.state = {
        nameInput: ''
      };
    }

    handleChangeInput(value, fieldName) {
      this.setState({
        [fieldName]: value
      });
    }

    handleSave() {
        let category = {
          Name: this.state.nameInput
        };

        let request = {
          method: 'POST',
          headers: { 'Content-Type':'application/json',
                     'Authorization': 'Bearer ' + localStorage.getItem('access_token')},
          body: JSON.stringify(category)
        };

        return dispatch => {

        dispatch(this.props.addTicketCategory());

        return fetch('http://localhost:3253/api/ticketcategory/Add', request)
          .then(response => response.json())
          .then(json =>  {
            if (json.Message) {
              dispatch(this.props.addTicketCategoryFailure(json.ExceptionMessage));
              return Promise.reject(json);
            } else {
              category.Id = json;
              this.props.addTicketCategorySuccess(category);
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
            <FormInput name="nameInput" className="form-control" placeholder="Category name" onValueChange={this.handleChangeInput.bind(this)} />
        </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.props.dispatch(this.handleSave())}>Save</Button>
          </Modal.Footer>
        </Modal>
      );
  }
};

export default connect(null, actions)(TicketCategoryAddModal);
