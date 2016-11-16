import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import { browserHistory } from 'react-router';

import FormInput from './FormInput';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChangeInput(value, fieldName){
    this.setState({
      [fieldName]: value
    });
  }

  handleFormSubmit(event) {
    var username = this.state.username;
    var password = this.state.password;

    let request = {
      method: 'POST',
      headers: { 'Content-Type':'application/x-www-form-urlencoded' },
      body: `grant_type=password&username=${username}&password=${password}`
    }

    return dispatch => {
      var credentials = {
        username: username,
        password: password
      }

      dispatch(this.props.signIn(credentials));

      return fetch('http://localhost:3253/Token', request)
        .then(response => response.json().then(user => ({ user, response })))
        .then(({ user, response }) =>  {
          if (!response.ok) {
            var message = user.error_description;
            dispatch(this.props.signInFailure(message));
            return Promise.reject(user);
          } else {
            localStorage.setItem('access_token', user.access_token);

            if(user.isAdmin === 'True'){
              localStorage.setItem('isAdmin', 'True');
            } else {
              localStorage.setItem('isAdmin', 'False');
            }

            dispatch(this.props.signInSuccess(user));
            browserHistory.push('/');
          }
        }).catch(err => dispatch(this.props.signInFailure(err)));
    }
  };

  render() {
    return(
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Log In</h2>
          <FormInput name="username" className="form-control" placeholder="Username" onValueChange={this.handleChangeInput.bind(this)} />
          <FormInput name="password" className="form-control" placeholder="Password" type="password" onValueChange={this.handleChangeInput.bind(this)} />
          <div className="help-block">{this.props.auth.errorMessage}</div>
          <button onClick={(event) => this.props.dispatch(this.handleFormSubmit(event))} className="btn btn-primary">Sign In</button>
        </div>
    );
  }
}

export default connect(null, actions)(Login);
