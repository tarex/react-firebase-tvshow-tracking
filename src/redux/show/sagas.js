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

const loadRecentShows = async ({ start, limit = 24 }) =>
  await FirebaseDB.ref('dailylist')
    .startAt(null, start)
    .limitToFirst(limit)
    .once('value')
    .then(snap => snap.val());

const onSearchReqeust = async input =>
  await fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);

function* loadShows({ payload }) {
  const { startFrom, limit } = payload;
  const start = startFrom ? String(startFrom + 1) : undefined;
  try {
    const shows = yield call(loadRecentShows, { limit, start });
    yield put(showActions.loadSuccess(shows || []));
  } catch (error) {
    yield put(showActions.loadError(error));
  }
}

function* searchRequest({ payload }) {
  const { input } = payload;
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
    throttle(500, showActions.SEARCH_REQUEST, searchRequest),
  ]);
}
