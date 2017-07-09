import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autocomplete from 'react-toolbox/lib/autocomplete/Autocomplete';
import { getSuggestion } from '../../redux/show/selector';
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
  handleSelect = value => {
    const { suggestions } = this.props.shows;
    if (value) {
      this.props.history.push({
        pathname: `/tv/${suggestions[value].id}`,
        state: { modal: true, showItem: suggestions[value] },
      });
    }
  };
  handleQueryChange = value => {
    this.props.onSearch(value);
  };
  render() {
    const { showList } = this.props.shows;
    return (
      <div>
        <h1>Pick your favorite tv shows</h1>
        <span>you will recieve notification before the airtime</span>
        <Autocomplete
          direction="down"
          selectedPosition="above"
          onQueryChange={this.handleQueryChange}
          onChange={this.handleSelect}
          label="Search"
          source={this.props.autoSuggestions}
        />
        {showList.length
          ? <TvGrid
              title="Running Shows"
              series={showList}
              showLoadMore
              showViewAll
              loadMore={this.loadMore}
            />
          : 'Loading...'}
      </div>
    );
  }
}

export default connect(
  state => ({
    shows: state.shows.toJS(),
    autoSuggestions: getSuggestion(state),
  }),
  {
    loadShows: showActions.loadShows,
    onSearch: showActions.onSearch,
  },
)(LandingPage);
