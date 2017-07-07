import { createSelector } from 'reselect';

export const getWatchlist = createSelector(
  state => state.watchlist,
  watchlist => watchlist.toJS(),
);
