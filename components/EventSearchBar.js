import React, { Component } from 'react';

class EventSearchBar extends Component {



  render(){

    const filterPanelStyle = {
      'heigh': 'auto'
    };

    const filterColStyle = {
      'margin-right': '0'
    };

    const filterGroupStyle = {
      margin: '10px'
   };

    return(
      <div>

          <div id="filter-panel" className="filter-panel collapse in" style={this.filterPanelStyle}>
                <h3>Search for Events</h3>
                      <div className="panel panel-default">
                          <div className="panel-body">
                              <form className="form-inline" role="form">
                                  <div className="form-group">
                                      <label className="filter-col" style={this.filterColStyle} for="pref-perpage">Locations:</label>
                                      <select id="pref-perpage" className="form-control">
                                          <option value="9">9</option>
                                          <option selected="selected" value="10">10</option>
                                      </select>
                                  </div>
                                  <div className="form-group">
                                      <label className="filter-col" style={this.filterColStyle} for="pref-orderby">Order by:</label>
                                      <select id="pref-orderby" className="form-control">
                                          <option>Descendent</option>
                                      </select>
                                  </div>
                                  <div className="form-group">
                                        <button id="logoutBtn" type="submit" className="btn btn-default">Search!</button>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>


      </div>
    )
  }
};

export default EventSearchBar;
