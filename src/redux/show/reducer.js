import { Record } from 'immutable';
import showActions from './actions';

const initialState = new Record({
  loading: false,
  showList: [],
  day: 0, // today
  error: null,
});

const getShowFormat = shows => {
  const allShows = [];
  Object.keys(shows).forEach(showId => {
    allShows.push({
      ...shows[showId],
    });
  });
  return allShows;
};

export default function showReducer(
  state = new initialState(),
  { type, payload },
) {
  switch (type) {
    case showActions.LOAD_SHOWS:
      return state.merge({ loading: true, error: null });

    case showActions.LOAD_SHOWS_SUCCESS:
      const data = state.toJS();
      const shows = getShowFormat(payload.shows);
      return state.merge({
        loading: false,
        showList: [...data.showList, ...shows],
      });

    case showActions.LOAD_SHOWS_ERROR:
      return state.merge({ loading: false, error: payload.error });

    default:
      return state;
  }
}
