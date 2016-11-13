import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import { browserHistory } from 'react-router';

class Login extends Component {

  handleFormSubmit(event) {

    var username = this.refs.username.value;
    var password = this.refs.password.value;

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
            dispatch(this.props.signInSuccess(user));
            browserHistory.push('/');
          }
        }).catch(err => dispatch(this.props.signInFailure(err)));
    }
  };

  render() {
    return(
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Log In</h2><br/>
            <input name="username" ref="username" className="form-control" type="text" placeholder="Username" />
            <input name="password" ref="password" className="form-control" type="password" placeholder="Password" />
            <div className="help-block">{this.props.auth.errorMessage}</div>
            <button onClick={(event) => this.props.dispatch(this.handleFormSubmit(event))} className="btn btn-primary">Sign In</button>
        </div>

    );
  }
}

export default connect(null, actions)(Login);
