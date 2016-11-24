import React, { Component } from 'react';

var PieChart = require("react-chartjs").Pie;
var Chart = require('chartjs');

class ChartStatistics extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData: [
          {
            color: '#F7464A',
            highlight: '#FF5A5E',
            label: 'Red',
            value: 120.59943
          },
          {
            color: '#46BFBD',
            highlight: '#5AD3D1',
            label: 'Green',
            value: 298.5961241616597
          },
      ],
      chartOptions: {

      }
    }
  }

  render(){
    return <PieChart data={this.state.chartData} width="600" height="250" redraw/>
  }
};

export default ChartStatistics;
