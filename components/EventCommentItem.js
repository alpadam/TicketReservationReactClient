import React, { Component } from 'react';
import {IntlProvider, FormattedTime} from 'react-intl';

class EventCommentsItem extends Component {

  render(){
    return(
      <div className="row">
        <div className="col-lg-12">
          <div className="col-lg-12">
          <div className="panel panel-default">
              <div className="panel-heading">
                <strong>{this.props.userComment.User.UserName}</strong>
                <span className="text-muted"> commented on </span>
                  <IntlProvider locale="en">
                    <FormattedTime
                      value={this.props.userComment.Date}
                      day="numeric"
                      month="long"
                      year="numeric"/>
                  </IntlProvider>
              </div>
              <div className="panel-body">
                {this.props.userComment.Text}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default EventCommentsItem
