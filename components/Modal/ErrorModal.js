import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ErrorModal extends Component {

    render() {
      return (
        <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-sm">Something went wrong!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>An error has occured.</h4>
            <h4>{this.props.errorMessage}</h4>
          </Modal.Body>
        </Modal>
      );
  }
};

export default ErrorModal;
