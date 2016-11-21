import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';

import TicketCategoryAddModal from './Modal/TicketCategoryAddModal';
import ErrorModal from './Modal/ErrorModal';

class TicketCategoryEditList extends Component {

  constructor(props){
    super(props);
    props.dispatch(this.getCategories());
    this.state = {
        showModal: false,
        selectedCategory: null
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

  handleDelete(id) {
      let request = {
        method: 'DELETE',
        headers: { 'Content-Type':'application/json',
                   'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
      };

      return dispatch => {
        dispatch(this.props.deleteTicketCategory());
        return fetch('http://localhost:3253/api/ticketcategory/'+ id, request)
          .then(response =>  {
            if (!response.ok) {
              dispatch(this.props.deleteTicketCategoryFailure(response.statusText));
              return Promise.reject(response);
            } else {
              this.props.deleteTicketCategorySuccess(id);
            }
          }).catch(err => dispatch(this.props.deleteTicketCategoryFailure(err)));
      }
  }

  handleEdit(category) {
    this.setState({
      showModal: true,
      selectedCategory: category
    });
  }

  render(){
    return(
        <div className="container">

          <ErrorModal show={this.props.ticketCategories.errorMessage != ''} errorMessage={this.props.ticketCategories.errorMessage} onHide={() => {this.setState({ showModal: false, selectedCategory: null }); this.props.dispatch(this.props.handleError());}} />
          <TicketCategoryAddModal selectedCategory={this.state.selectedCategory} dispatch={this.props.dispatch} show={this.state.showModal && this.props.ticketCategories.errorMessage === ''} onHide={() => this.setState({ showModal: false, selectedCategory: null })} />

          <div className="jumbotron">
            <h1>Ticket categories</h1>
          </div>
          <button onClick={()=>this.setState({ showModal: true })} className="btn btn-primary">Add new ticket category</button>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th></th>
                <th></th>
              </tr>
              {
                  this.props.ticketCategories.categories.map((category) => {
                    return (
                      <tr>
                        <td>{category.Id}</td>
                        <td>{category.Name}</td>
                        <td><button onClick={()=> this.handleEdit(category)} className="btn btn-primary">Edit</button></td>
                        <td><button onClick={()=> this.props.dispatch(this.handleDelete(category.Id))} className="btn btn-danger">Delete</button></td>
                      </tr>
                    );
                  })
              }
            </tbody>
          </table>
        </div>
    );
  }
};

export default  connect(null, actions)(TicketCategoryEditList);
