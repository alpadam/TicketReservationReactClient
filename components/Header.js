import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import actions from '../redux/actions';

class Header extends React.Component {

  renderAuthComponents() {
    if(!this.props.isAuthenticated){
      return [
          <li className="nav-item" key={1}>
            <Link className="nav-link" to="/login">Login</Link>
          </li>,
          <li className="nav-item" key={2}>
            <Link className="nav-link" to="/register">Register</Link>
          </li>,
      ];
    } else {
      return (
          <li className="nav-item" key={1}>
            <Link className="nav-link" to="/input">Todo input</Link>
          </li>
      )
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Ticket reservation</Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            {this.renderAuthComponents()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: { authenticated: state.auth.authenticated }}
}

export default connect(mapStateToProps)(Header);
