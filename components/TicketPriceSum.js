import React, { Component } from 'react';

class TicketPriceSum extends Component {

  constructor(props){
      super(props);
      this.state = {
        sum : 0
      }
  }

  componentWillReceiveProps(nextProps){
         this.calculateSum(nextProps)
  }

  calculateSum(nextProps){
    var sumValue = 0;
    for (var key in nextProps.quantities) {
        for (let ticket of nextProps.tickets) {
          if(Number.parseInt(key) === ticket.Id){
            sumValue = sumValue + Number.parseInt(nextProps.quantities[key]) * ticket.Price;
          }
        }
    };

    this.setState({ sum: sumValue});
  }

  render() {
    return (
      <div>
        <h4 id="sumPrice">Sum: <b>{this.state.sum} HUF</b></h4>
      </div>
    )
  }
}
export default TicketPriceSum;
