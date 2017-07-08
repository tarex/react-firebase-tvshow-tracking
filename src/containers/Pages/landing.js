import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from 'react-toolbox/lib/input/Input';

import PopularList from '../Shows/popular';
import RecentList from '../Shows/recent';
import TopRatedList from '../Shows/toprated';
import TvGrid from '../TvGrid/grid';
import showActions from '../../redux/show/actions';

class LandingPage extends Component {
  loadMore = type => {
    const { showList } = this.props.shows;
    const startFrom = showList[showList.length - 1].id;
    this.props.loadShows(startFrom);
  };
  render() {
    const { showList } = this.props.shows;
    return (
      <div>
        <h1>Pick your favorite tv shows</h1>
        <TvGrid
          title="Running Shows"
          series={showList}
          showLoadMore
          showViewAll
          loadMore={this.loadMore}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    shows: state.shows.toJS(),
  }),
  { loadShows: showActions.loadShows },
)(LandingPage);
