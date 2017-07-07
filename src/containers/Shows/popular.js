import React, { Component } from 'react';
import { connect } from 'react-redux';

class Popular extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <h3>Popular</h3>
      </div>
    );
  }
}

export default connect(
  state => ({
    popularShows: state.shows.popularShows,
  }),
  {},
)(Popular);
