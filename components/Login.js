import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';

class Login extends React.Component {

  handleFormSubmit(event) {

    var username = this.refs.username.value;
    var password = this.refs.password.value;

    let request = {
      method: 'POST',
      headers: { 'Content-Type':'application/x-www-form-urlencoded' },
      body: `grant_type=password&username=${username}&password=${password}`
    }

    console.log(request);

    return dispatch => {

      var credentials = {
        username: username,
        password: password
      }

      console.log(credentials);

      this.props.dispatch(this.props.signIn(credentials));

      return fetch('http://localhost:3253/Token', request)
        .then(response => response.json().then(user => ({ user, response })))
        .then(({ user, response }) =>  {
          if (!response.ok) {
            var message = user.error_description;
            console.log(message);
            this.props.dispatch(this.props.signInFailure(message));
            return Promise.reject(user);
          } else {
            console.log(user);
            localStorage.setItem('access_token', user.access_token);
            this.props.dispatch(this.props.signInSuccess(user));
          }
        }).catch(err => this.props.dispatch(this.props.signInFailure(err)));
    }
  };

  render() {
    return(
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Log In</h2>
            <input name="username" ref="username" className="form-control" type="text" placeholder="Username" />
            <input name="password" ref="password" className="form-control" type="password" placeholder="Password" />
            <div className="help-block">{this.props.auth.errorMessage}</div>
            <button onClick={(event) => this.props.dispatch(this.handleFormSubmit(event))} className="btn btn-primary">Sign In</button>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Login);
