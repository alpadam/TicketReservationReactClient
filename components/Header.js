import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

class Header extends React.Component {

  logout(event) {
    this.props.actions.logOut();
    localStorage.removeItem('access_token');
    localStorage.removeItem('isAdmin');
    browserHistory.push('/login');
  }

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
    } else if(this.props.isAdmin) {
      return [
          <li className="nav-item" key={1}>
            <Link className="nav-link" to="/admin/events">Events</Link>
          </li>,
          <li className="nav-item" key={2}>
            <Link className="nav-link" to="/admin/ticketcategories">Ticket categories</Link>
          </li>,
          <li className="nav-item" key={3}>
            <Link className="nav-link" to="/admin/hostLocations">Host locations</Link>
          </li>,
          <li key ={4}>
            <button id="logoutBtn" type="button" onClick={(event) => this.logout()} className="btn btn-default navbar-btn btn-danger">Log out</button>
          </li>
      ];
    } else {
      return [
          <li className="nav-item" key={1}>
            <Link className="nav-link" to="/input">Todo input</Link>
          </li>,
          <li className="nav-item" key={2}>
            <Link className="nav-link" to="/userProfile">User profile</Link>
          </li>,
          <li key ={3}>
            <button id="logoutBtn" type="button" onClick={(event) => this.logout()} className="btn btn-default navbar-btn btn-danger">Log out</button>
          </li>
      ];
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

/*function mapStateToProps(state) {
  return { auth: { authenticated: state.auth.authenticated }}
}*/

export default Header;
