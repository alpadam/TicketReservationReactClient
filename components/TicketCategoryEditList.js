import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';

import TicketCategoryAddModal from './Modal/TicketCategoryAddModal';

class TicketCategoryEditList extends Component {

  constructor(props){
    super(props);
    props.dispatch(this.getCategories());
    this.state = {
        showModal: false
    };
  }

  getCategories(){
    let request = {
      method: 'GET',
      headers: { 'Content-Type':'application/x-www-form-urlencoded' }
    }

    return dispatch => {
      dispatch(this.props.getTicketCategoriesList());
      return fetch('http://localhost:3253/api/ticketcategory', request)
        .then(response => response.json().then(category => ({ category, response })))
        .then(({ category, response }) =>  {
          if (!response.ok) {
            dispatch(this.props.getTicketCategoriesFailure(category));
            return Promise.reject(category);
          } else {
            dispatch(this.props.getTicketCategoriesSuccess(category));
          }
        }).catch(err => console.log("ERROR"));
    }
  };

  render(){
    return(
        <div className="container">
          <div className="jumbotron">
            <h1>Ticket categories</h1>
          </div>
          <TicketCategoryAddModal actions={this.props.actions} show={this.state.showModal} onHide={() => this.setState({ showModal: false })} />
          <button onClick={()=>this.setState({ showModal: true })} className="btn btn-primary">Add new ticket category</button>
          <table className="table table-striped">
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
          {
              this.props.ticketCategories.categories.map((category) => {
                return (
                  <tr>
                    <td>{category.Id}</td>
                    <td>{category.Name}</td>
                  </tr>
                );
              })
          }
          </table>
        </div>
    );
  }
};

export default  connect(null, actions)(TicketCategoryEditList);
