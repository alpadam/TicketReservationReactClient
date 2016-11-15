import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../redux/actions';

import Header from './Header';

class App extends Component {
  render(){
    return (
      <div>
        <Header isAuthenticated={this.props.auth.isAuthenticated} isAdmin={this.props.auth.isAdmin} actions={this.props.actions} />
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
};

//azért, hogy ne kelljen minden egyes modulhoz hozzárendelni/átadni
function mapStateToProps(state){
  return state;
}

function mapDispatchToProps(dispatch){
  return {
    //elég innentől kezdve az action-t meghívni, wrappelve van
    dispatch: dispatch,
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
