import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import { browserHistory } from 'react-router';

import FormInput from './FormInput';

class Register extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      fullName: '',
      password: '',
      passwordConfirm: ''
    };
  }

  handleChangeInput(value, fieldName){
    this.setState({
      [fieldName]: value
    });
  }

  handleFormSubmit(event) {
    var model = {
      UserName: this.state.username,
      Email: this.state.email,
      FullName: this.state.fullName,
      Password: this.state.password,
      ConfirmPassword: this.state.passwordConfirm
    };

    let request = {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(model)
    };

    return dispatch => {
      dispatch(this.props.register());

      return fetch('http://localhost:3253/api/Account/Register', request)
        .then(response => response.json().then(user => ({ user, response })))
        .then(({ user, response }) =>  {
          if (!response.ok) {
            dispatch(this.props.registerFailure(user.Message));
            return Promise.reject(user);
          } else {
            dispatch(this.props.registerSuccess(user));
            browserHistory.push('/login');
          }
        }).catch(err => dispatch(this.props.registerFailure(err)));
    }
  };

  render() {
    return(
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Sign up</h2>
          <FormInput name="username" className="form-control" placeholder="Username" onValueChange={this.handleChangeInput.bind(this)} />
          <FormInput name="email" className="form-control" placeholder="Email" onValueChange={this.handleChangeInput.bind(this)} />
          <FormInput name="fullName" className="form-control" placeholder="Full name" onValueChange={this.handleChangeInput.bind(this)} />
          <FormInput name="password" className="form-control" placeholder="Password" type="password" onValueChange={this.handleChangeInput.bind(this)} />
          <FormInput name="passwordConfirm" className="form-control" placeholder="Password confirmation" type="password" onValueChange={this.handleChangeInput.bind(this)} />
          <div className="help-block">{this.props.auth.errorMessage}</div>
          <button onClick={(event) => this.props.dispatch(this.handleFormSubmit(event))} className="btn btn-primary">Sign up!</button>
        </div>
    );
  }
}

export default connect(null, actions)(Register);
