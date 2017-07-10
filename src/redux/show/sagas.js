import { delay } from 'redux-saga';
import {
  takeEvery,
  throttle,
  put,
  call,
  fork,
  take,
  all,
} from 'redux-saga/effects';
import { TVAPI } from '../../helper/utility/superFetch';
import { FirebaseDB } from '../../helper/firebase';
import showActions from './actions';

const loadRecentShows = ({ start, limit = 20 }) =>
  new Promise(resolve =>
    FirebaseDB.ref('dailylist')
      .startAt(null, start)
      .limitToFirst(limit)
      .once('value')
      .then(snap => resolve(snap.val())));

const onSearchReqeust = input =>
  new Promise((resolve, reject) =>
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(error => reject(error)));

function* loadShows({ payload }) {
  const { startFrom, limit } = payload;
  const start = startFrom ? String(startFrom + 1) : undefined;
  yield call(delay, 500);
  try {
    const shows = yield call(loadRecentShows, { limit, start });
    yield put(showActions.loadSuccess(shows || []));
  } catch (error) {
    yield put(showActions.loadError(error));
  }
}

function* searchRequest({ payload }) {
  const { input } = payload;

  // yield call(delay, 1000);
  try {
    const shows = yield call(onSearchReqeust, input);
    yield put(showActions.searchSuccess(shows));
  } catch (error) {
    yield put(showActions.searchError(error));
  }
}

export default function* showSagas() {
  yield all([
    takeEvery(showActions.LOAD_SHOWS, loadShows),
    throttle(1000, showActions.SEARCH_REQUEST, searchRequest),
  ]);
}
