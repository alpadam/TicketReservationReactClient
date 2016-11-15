import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function(WrappedComponent) {
  class RequireAdmin extends React.Component {
    componentWillMount() {
      if (!this.props.auth.isAdmin) {
        browserHistory.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      isAdmin: state.auth.isAdmin
    };
  }

  return connect(mapStateToProps)(RequireAdmin);
}
