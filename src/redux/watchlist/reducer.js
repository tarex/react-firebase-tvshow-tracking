import { Record } from 'immutable';
import watchActions from './actions';

const initialState = new Record({
  loading: false,
  successMessage: null,
  myshows: {},
});

export default function watchlistReducer(
  state = new initialState(),
  { type, payload },
) {
  switch (type) {
    case watchActions.WATCHLIST:
      return state.merge({
        loading: true,
      });
    case watchActions.WATCHLIST_SUCCESS:
      return state.merge({
        loading: false,
        successMessage: payload.status == 'add'
          ? 'Added Successfully'
          : 'Removed from your watchlist',
      });
    case watchActions.WATCHLIST_ERROR:
      return state.merge({
        loading: false,
        error: payload.error,
      });
    case watchActions.DISMISS_SUCCESS_MESSAGE:
      return state.merge({
        successMessage: null,
      });
    case watchActions.UPDATE_WATCHLIST:
      return state.merge({
        myshows: payload.shows,
      });
    default:
      return state;
  }
}
