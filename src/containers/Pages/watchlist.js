import React from 'react';
import { connect } from 'react-redux';
import { getWatchlist } from '../../redux/watchlist/selectors';
import TvGrid from '../TvGrid/grid';

const linear = (shows = {}) => {
  const allShows = [];
  const showKyes = Object.keys(shows || {});
  showKyes.length &&
    showKyes.forEach(show => {
      allShows.push(shows[show]);
    });
  return allShows;
};

export default connect(
  state => ({
    myshows: getWatchlist(state).myshows,
  }),
  {},
)(({ myshows }) => {
  const loadMore = () => {};
  const linearShows = linear(myshows);
  return (
    <div>
      {linearShows.length
        ? <TvGrid
            title="Watchlist"
            type="popularList"
            series={linearShows}
            loadMore={loadMore}
            limit="11"
          />
        : <div> <h5>You haven't selected any shows</h5> </div>}
    </div>
  );
});
