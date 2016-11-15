import React, { Component } from 'react';

class FormInput extends Component {

  constructor(props){
      super(props);
      this.state = {
        inputText: '',
        inputType: this.props.type || 'text'
      }
  }

  handleChange(event){
    //azért, mert a setState() async
    this.setState({
        inputText: event.target.value
    }, () => {
      this.props.onValueChange(this.state.inputText, this.props.name);
    });
  }

  render(){
    return <input type={this.state.inputType} value={this.state.inputText} className={this.props.className} placeholder={this.props.placeholder} onChange={this.handleChange.bind(this)} />
  }
};

export default FormInput;
