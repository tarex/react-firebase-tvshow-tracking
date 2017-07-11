import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autocomplete from 'react-toolbox/lib/autocomplete/Autocomplete';
import { getSuggestion } from '../../redux/show/selector';
import TvGrid from '../TvGrid/grid';
import showActions from '../../redux/show/actions';

class LandingPage extends Component {
  state = {
    notFound: false,
  };
  padArrayWithDefault = (count = 24) => {
    const dummyArray = [];
    while (dummyArray.length < count) {
      dummyArray.push({
        id: new Date().getTime(),
        image: {
          original: 'https://via.placeholder.com/214x321',
        },
      });
    }
    return dummyArray;
  };
  loadMore = type => {
    const { showList } = this.props.shows;
    const startFrom = showList[showList.length - 1].id;
    this.props.loadShows(startFrom);
  };
  handleSelect = value => {
    const { suggestions } = this.props.shows;
    if (value && suggestions[value]) {
      this.props.history.push({
        pathname: `/tv/${suggestions[value].id}`,
        state: { modal: true, showItem: suggestions[value] },
      });
      this.setState({ notFound: false });
    } else {
      this.setState({ notFound: true });
    }
  };
  handleQueryChange = value => {
    this.props.onSearch(value);
  };
  render() {
    const { showList } = this.props.shows;
    const { notFound } = this.state;
    const series = showList.length ? showList : this.padArrayWithDefault(24);
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
        {notFound ? <p>Please select from suggestions</p> : null}
        <TvGrid
          title="Running Shows"
          series={series}
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
    autoSuggestions: getSuggestion(state),
  }),
  {
    loadShows: showActions.loadShows,
    onSearch: showActions.onSearch,
  },
)(LandingPage);
