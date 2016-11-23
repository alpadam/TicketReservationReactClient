import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import FormInput from '../FormInput';
import ImageUpload from '../ImageUpload';

class EventAddModal extends Component {
    constructor(props){
      super(props);
      this.state = {
        nameInput: '',
        description: '',
        date: '',
        isSuspended: false,
        isClosed: false,
        hostLocationId : null,
        actualCategoryName: '',
        actualEventTicketQuantity: '',
        actualEventTicketPrice: '',
        eventTickets: [],
        image: ''
      }
    }

    handleChangeInput(value, fieldName) {
      this.setState({
        [fieldName]: value
      });
    }

    handleSave() {
        let event = {
          Name: this.state.nameInput,
          Date: this.state.date,
          Description: this.state.description,
          IsSuspended: this.state.isSuspended,
          IsClosed: this.state.isClosed,
          LocationId: this.state.hostLocationId,
          EventTickets: this.state.eventTickets,
          Image: {
            Content: this.state.image
          }
        };

        let url = 'http://localhost:3253/api/event/Add';
        let request = {
          method: 'POST',
          headers: {  'Content-Type':'application/json',
                      'enctype': 'multipart/form-data',
                     'Authorization': 'Bearer ' + localStorage.getItem('access_token')},
          body: JSON.stringify(event)
        };

        return dispatch => {
          dispatch(this.props.addEvent());
          return fetch(url.toString(), request)
            .then(response => response.json())
            .then(json =>  {
              if (json.Message) {
                dispatch(this.props.addEventFailure(json.ExceptionMessage));
                return Promise.reject(json);
              } else {
                event.Id = json;
                this.props.addEventSuccess(event);
                this.props.onHide();
                dispatch(this.props.eventRefresh());
              }
            }).catch(err => this.props.dispatch(this.props.addEventFailure(err)));
          }
    }

    addEventTicket(){
      this.setState({
        eventTickets: [ {
          TicketCategory: {
            Name: this.state.actualCategoryName
          },
          Quantity: this.state.actualEventTicketQuantity,
          Price: this.state.actualEventTicketPrice
        }, ...this.state.eventTickets]
      }, () => this.setState({
        actualCategoryId: null,
        actualEventTicketPrice: '',
        actualEventTicketQuantity: ''
      }));
    }

    render() {
      return (
        <Modal {...this.props} aria-labelledby="contained-modal-title-sm">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-sm">Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Please add a new event</h4>
            <FormInput name="nameInput" inputText={this.state.nameInput} className="form-control" placeholder="Event name" onValueChange={this.handleChangeInput.bind(this)} />
            <FormInput name="description" className="form-control" placeholder="Description" onValueChange={this.handleChangeInput.bind(this)} />
            <FormInput name="date" type="datetime-local" className="form-control" onValueChange={this.handleChangeInput.bind(this)} />
            <select className="form-control" id="locations" value={this.state.hostLocationId || ''}
              onChange={e => this.setState({ hostLocationId: e.target.value || null })}>
                <option value="">Select location!</option>
                {
                  this.props.hostLocations.map((hostLocation) => {
                    return <option key={hostLocation.Id} value={hostLocation.Id}>{hostLocation.Name} ({hostLocation.Capacity} people)</option>
                  })
                }
            </select>
            <br />
            <select className="form-control" value={this.state.actualCategoryName || ''}
              onChange={e => this.setState({ actualCategoryName: e.target.value || null })}>
                <option value="">Select ticket category!</option>
                {
                  this.props.categories.map((category) => {
                    return <option key={category.Id} value={category.Name}>{category.Name}</option>
                  })
                }
            </select>
            <FormInput name="actualEventTicketQuantity" inputText={this.state.actualEventTicketQuantity} className="form-control" placeholder="Event ticket quantity" onValueChange={this.handleChangeInput.bind(this)} />
            <FormInput name="actualEventTicketPrice" inputText={this.state.actualEventTicketPrice} className="form-control" placeholder="Event ticket price" onValueChange={this.handleChangeInput.bind(this)} />
            <Button onClick={() => this.addEventTicket()}>Add</Button>
            <br />
            {this.state.eventTickets.length > 0 &&
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th>Ticket category</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                  {
                    this.state.eventTickets.map((eventticket) => {
                      return (
                        <tr>
                          <td>{eventticket.TicketCategory.Name}</td>
                          <td>{eventticket.Quantity}</td>
                          <td>{eventticket.Price}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            }
            <ImageUpload name="image" onValueChange={this.handleChangeInput.bind(this)}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.props.dispatch(this.handleSave())}>Save</Button>
          </Modal.Footer>
        </Modal>
      );
  }
};

export default connect(null, actions)(EventAddModal);
