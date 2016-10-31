import React, { Component } from 'react';

class UserInfo extends Component {

  handleNewId(){
    this.props.createNewUserId();
  }

  render(){
    return(
      <li>
        <div>Username: {this.props.user.username}</div>
        <div>Id: {this.props.user.id}</div>
        <button onClick={this.handleNewId.bind(this)}>Update with random id</button>
      </li>
    )
  }
};

export default UserInfo;
