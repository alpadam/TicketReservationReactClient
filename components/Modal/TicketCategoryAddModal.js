import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
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

        console.log(category);

        //this.props.actions.addTicketCategory(category);
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
            <Button onClick={() => this.handleSave()}>Save</Button>
          </Modal.Footer>
        </Modal>
      );
  }
};

export default TicketCategoryAddModal;
