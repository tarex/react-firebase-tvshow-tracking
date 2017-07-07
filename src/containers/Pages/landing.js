import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from 'react-toolbox/lib/input/Input';

import PopularList from '../Shows/popular';
import RecentList from '../Shows/recent';
import TopRatedList from '../Shows/toprated';
import TvGrid from '../TvGrid/grid';
import showActions from '../../redux/show/actions';

class LandingPage extends Component {
  componentDidMount() {}
  loadMore = type => {
    // const list = this.props.shows[type];
    //this.props.loadShows(type);
    console.log('load more');
  };
  render() {
    const { showList } = this.props.shows;
    return (
      <div>
        <h1>Pick your favorite tv shows</h1>
        <span>We will send reminder, you won't miss any episode</span>
        <TvGrid
          title="Running Shows"
          series={showList}
          showLoadMore
          showViewAll
          loadMore={this.loadMore}
          limit="11"
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

{
  /*

<TvGrid
  title="Recent"
  type="recentList"
  series={recentList.results}
  loadMore={this.loadMore}
  showLoadMore
  showViewAll
  limit="7"
/>
<TvGrid
  title="Top rated"
  type="topratedList"
  series={topratedList.results}
  loadMore={this.loadMore}
  showLoadMore
  showViewAll
  limit="7"
/> */
}
