import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../redux/actions';

import TodoInput from './TodoInput';
import TodoList from './TodoList';
import UserInfo from './UserInfo';

//es6
/*class App extends Component {
  render(){
    return <div>This is a REACT app now...</div>;
  };
};*/

//es5
var App = React.createClass({
  render(){
    return (
        <div>
          <h1>Todo list</h1>
          <UserInfo user={this.props.user} createNewUserId={this.props.actions.createNewUserId}/>
          <TodoInput actions={this.props.actions} />
          <TodoList todos={this.props.todos} actions={this.props.actions}/>
        </div>
    )
  }
});

//azért, hogy ne kelljen minden egyes modulhoz hozzárendelni/átadni
function mapStateToProps(state){
  return state;
}

function mapDispatchToProps(dispatch){
  return {
    //elég innentől kezdve az action-t meghívni, wrappelve van
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
