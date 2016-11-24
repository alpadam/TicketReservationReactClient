import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import EventCommentItem from './EventCommentItem';
import LoadingComponent from './LoadingComponent';

class EventComments extends Component {

  constructor(props){
    super(props)
    this.state = {
      Text: ''
    }
  }

  componentDidMount(){
    this.props.dispatch(this.getEventComments(this.props.eventId))
  }

  getEventComments(id){
    let request = {
      method: 'GET',
      headers: { 'Content-Type':'application/json'}
    }

    return dispatch => {
      dispatch(this.props.getEventUserComments());

      return fetch('http://localhost:3253/Api/usercomment/eventid/'+ id, request)
        .then(response => response.json().then(userComments => ({ userComments, response })))
        .then(({ userComments, response }) =>  {
          if (!response.ok) {
            var message = userComments.error_description;
            dispatch(this.props.getEventUserCommentsFailure(message));
            return Promise.reject(userComments);
          } else {
            return dispatch(this.props.getEventUserCommentsSuccess(userComments));
          }
        }).catch(err => dispatch(this.props.getEventUserCommentsFailure(err)));
    }
  }

  handleAddComment() {
    let newComment = {
      Text: this.state.Text,
      EventId:this.props.eventId
    };

    let request = {
      method: 'POST',
      headers: { 'Content-Type':'application/json',
                 'Authorization': 'Bearer ' + localStorage.getItem('access_token')},
      body: JSON.stringify(newComment)
    };
    console.log(newComment);
    console.log(request)

    return dispatch => {

    dispatch(this.props.addEventUserComment());

    return fetch('http://localhost:3253/api/usercomment/add', request)
      .then(response => response.json())
      .then(json =>  {
        if (json.Message) {
          dispatch(this.props.addEventUserCommentFailure(json.ExceptionMessage));
          return Promise.reject(json);
        } else {
          this.props.addEventUserCommentSuccess();
          this.setState({ Text: ''});
          return this.props.dispatch(this.getEventComments(this.props.eventId));
       }
    }).catch(err => dispatch(this.props.addEventUserCommentFailure(err)));
   }
  }

  isFetching(){
    if(this.props.eventComments.isFetching){
      return <LoadingComponent/>
    }else{
      if(this.props.eventComments.comments.length === 0 ){
        return(
          <div className="col-lg-12">
              <p>There aren't any comments for this event!</p>
          </div>
        )
      }else{
        return(
          this.props.eventComments.comments.map((userComment) => {
            return <EventCommentItem key={userComment.Id} userComment={userComment}/>
          })
        )
      }
    }
  }

  checkIsAuthenticated(){
    if(!this.props.isLoggedIn){
      return (
      <div className="alert alert-danger" role="alert">
        <span className="glyphicon glyphicon-info-sign" aria-hidden="true"> </span>
        In order to write comment, please <b>log in</b>!
      </div>
      )
    }else{
      return(
        <div className="widget-area no-padding blank">
          <div className="status-upload">
            <textarea placeholder="Add your comment text here" required
              value={this.state.Text || ''}
              onChange={e => this.setState({ Text: e.target.value || null })}></textarea>
            <button id="addCommentBtn" className="btn btn-primary" onClick={() => this.props.dispatch(this.handleAddComment())}>
              <span className="glyphicon glyphicon-plus" aria-hidden="true"/> Add
            </button>
        </div>
        </div>
      )
    }
  }

  render(){
    return(
      <div>
        <h2>User comments</h2>
          {this.isFetching()}
        <h2>New comment</h2>
        <div className="row" id="addCommentBox">
          <div className="col-lg-12">
            <div className="col-lg-12">
              {this.checkIsAuthenticated()}
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default connect(null, actions)(EventComments)
