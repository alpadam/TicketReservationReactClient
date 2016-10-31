import React, { Component } from 'react';

class TextDisplay extends Component {

  handleClick(){
    this.props.deleteLetter();
  }

  render(){
    return (
        <div>
          <div>Im displaying text: {this.props.txt}</div>
          <button onClick={this.handleClick.bind(this)}>Delete button</button>
        </div>
    )
  }

};

export default TextDisplay;
