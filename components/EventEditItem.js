import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import { browserHistory } from 'react-router';

import FormInput from './FormInput';
import DatePicker from 'react-datepicker';

class EventEditItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      eventName: ''

    };
  }

  handleChangeInput(value, fieldName){
    this.setState({
      [fieldName]: value
    });
  };

  saveEvent(event) {

  };

  handleChange(event){
    console.log(event);
  }

  render() {
    return(
        <div className="col-md-6 col-md-offset-3">
          <h1 className="text-center">Event - {this.state.eventName}</h1>
          <FormInput className="form-control" name="eventName" placeholder="Event name" onValueChange={this.handleChangeInput.bind(this)}/>
          <FormInput className="form-control" name="description" placeholder="Description" onValueChange={this.handleChangeInput.bind(this)}/>

          <DatePicker dateFormat="YYYY/MM/DD" onChange={this.handleChange} />

          <button onClick={(event) => this.props.dispatch(this.handleFormSubmit(event))} className="btn btn-primary">Save</button>
        </div>
    );
  }
}

export default EventEditItem;

/*
<div className="col-md-6 col-md-offset-3">
  <h2 className="text-center">Log In</h2>

  <FormInput name="username" className="form-control" placeholder="Username" onValueChange={this.handleChangeInput.bind(this)} />
  <FormInput name="password" className="form-control" placeholder="Password" type="password" onValueChange={this.handleChangeInput.bind(this)} />

  <div className="help-block">{this.props.auth.errorMessage}</div>
  <button onClick={(event) => this.props.dispatch(this.saveEvent(event))} className="btn btn-primary">Save</button>
</div>


<div className="col-md-6 col-md-offset-3">
  <h1 className="text-center">Event - {this.state.eventName}</h1>
  <FormInput name="eventName" placeholder="Event name" onValueChange={this.handleChangeInput.bind(this)}/>
  <FormInput name="description" placeholder="Description" onValueChange={this.handleChangeInput.bind(this)}/>
  <DatePicker dateFormat="YYYY/MM/DD" selected={new Date()} onChange={this.handleChange} />
  <button onClick={(event) => this.props.dispatch(this.handleFormSubmit(event))} className="btn btn-primary">Save</button>
</div>


  */
