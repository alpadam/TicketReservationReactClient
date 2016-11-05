import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function(WrappedComponent) {
  class RequireAuth extends React.Component {
    componentWillMount() {
      if (!this.props.auth.isAuthenticated) {
        browserHistory.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { isAuthenticated: state.auth.isAuthenticated };
  }

  return connect(mapStateToProps)(RequireAuth);
}
