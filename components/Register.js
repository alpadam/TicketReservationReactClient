import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';

class Register extends React.Component {

  render() {
    return(
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Sign up</h2>
            <input name="username" ref="username" className="form-control" type="text" placeholder="Email" />
            <input name="password" ref="password" className="form-control" type="password" placeholder="Password" />
            <input name="passwordConfirmation" ref="passwordConfirmation" className="form-control" type="password" placeholder="Password confirmation" />
            <div className="help-block">{this.props.auth.errorMessage}</div>
            <button onClick={(event) => this.props.dispatch(this.handleFormSubmit(event))} className="btn btn-primary">Sign up!</button>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Register);
