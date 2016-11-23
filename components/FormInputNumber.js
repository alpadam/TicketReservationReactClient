import React, { Component } from 'react';

class FormInputNumber extends Component {

  constructor(props){
      super(props);
      this.state = {
        inputValue: 0
      }
  }

  handleChange(event){
    //azért, mert a setState() async
    this.setState({
        inputValue: event.target.value
    }, () => {
      this.props.onValueChange(this.state.inputValue, this.props.name);
    });
  }

  render(){
    return <input type="number" min={this.props.min} max={this.props.max} value={this.state.inputValue} className={this.props.className} placeholder={this.props.placeholder} onChange={this.handleChange.bind(this)} />
  }
};

export default FormInputNumber;
