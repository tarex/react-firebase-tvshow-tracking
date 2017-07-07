const watchActions = {
  WATCHLIST: 'ADD_OR_REMOVE_FROM_WATCHLIST',
  WATCHLIST_SUCCESS: 'WATCHLIST_REQUEST_SUCCESS',
  WATCHLIST_ERROR: 'WATCHLIST_REQUEST_ERROR',

  LISTEN_WATCHLIST: 'LISTEN_WATCHLIST',
  UPDATE_WATCHLIST: 'UPDATE_WATCHLIST',
  DISMISS_SUCCESS_MESSAGE: 'DISMISS_SUCCESS_MESSAGE',

  watchlist: (data, ref) => ({
    type: watchActions.WATCHLIST,
    payload: { data, ref },
  }),

  watchlistSuccss: status => ({
    type: watchActions.WATCHLIST_SUCCESS,
    payload: { status },
  }),

  watchlistError: error => ({
    type: watchActions.WATCHLIST_ERROR,
    payload: { error },
  }),

  successMessageClose: () => ({
    type: watchActions.DISMISS_SUCCESS_MESSAGE,
  }),

  listen: user => ({
    type: watchActions.LISTEN_WATCHLIST,
    payload: { uid: user ? user.uid : null },
  }),

  updateWatchlist: (shows = {}) => ({
    type: watchActions.UPDATE_WATCHLIST,
    payload: { shows },
  }),
};

export default watchActions;
