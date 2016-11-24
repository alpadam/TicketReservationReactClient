import React, { Component } from 'react';
import LineChart from "react-chartjs";
import LoadingComponent from './LoadingComponent';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import {IntlProvider, FormattedTime} from 'react-intl';

class UserProfile extends Component {

  componentWillMount(){
    this.props.dispatch(this.getUserDetailsData());
  }

  getUserDetailsData(){

    let request = {
      method: 'GET',
      headers: { 'Content-Type':'application/json',
                 'Authorization': 'Bearer ' + localStorage.getItem('access_token')},
    }

    return dispatch => {
      dispatch(this.props.getUserDetails());

      return fetch('http://localhost:3253/api/user/userdata', request)
        .then(response => response.json().then(user => ({ user, response })))
        .then(({ user, response }) =>  {
          if (!response.ok) {
            var message = user.error_description;
            dispatch(this.props.getUserDetailsFailure(message));
            return Promise.reject(user);
          } else {
            return dispatch(this.props.getUserDetailsSuccess(user));
          }
        }).catch(err => dispatch(this.props.getUserDetailsFailure(err)));
    }
  };

  renderTransactions(){
    if(this.props.userDetails.user.Transactions.length === 0){
      return(<tr><h3>No transactions</h3></tr>)
    }else{
      return(
        this.props.userDetails.user.Transactions.map((transaction) => {
          return (
            <tr>
              <td>{transaction.Id}</td>
              <td>
                <IntlProvider locale="en">
                    <FormattedTime
                      value={transaction.Date}
                      day="numeric"
                      month="long"
                      year="numeric"/>
                </IntlProvider>
              </td>
              <td>{transaction.Price}</td>
              <td>{transaction.Event.Name}</td>
            </tr>
          )
        })
      )
    }
  }

  isFetching(){
    if(this.props.userDetails.isFetching){
      return <LoadingComponent/>
    }else{
      return(
        <div>
        <div className="row">
          <div className="jumbotron">
            <h1>User Profile</h1>
          </div>
          <div >
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">{this.props.userDetails.user.FullName}</h3>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-3 col-lg-3 " align="center"> <img alt="User Pic" src="/public/img/default.png" className="img-circle img-responsive"/> </div>

                  <div className=" col-md-9 col-lg-9 ">
                    <table className="table table-user-information">
                      <tbody>
                        <tr>
                          <td>Username</td>
                          <td>{this.props.userDetails.user.UserName}</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>{this.props.userDetails.user.Email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
                  <div className="panel-footer"></div>
            </div>
          </div>
        </div>

        <div className="row">
          <div >
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">Transactions</h3>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-12">
                    <table className="table table-user-information">
                      <tbody>
                        <tr>
                          <td><b>Transaction Id</b></td>
                          <td><b>Date</b></td>
                          <td><b>Price</b></td>
                          <td><b>Event</b></td>
                        </tr>
                        {this.renderTransactions()}
                      </tbody>
                    </table>

                  </div>
                </div>
              </div>
                   <div className="panel-footer">

                      </div>
            </div>
          </div>
        </div>
        </div>
      )
    }
  }

  render(){
    return(
      <div className="container">
        {this.isFetching()}
      </div>
    )
  }
};

export default connect(null, actions)(UserProfile);
