import { takeEvery, put, call, fork, take, all } from 'redux-saga/effects';
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

export default function* showSagas() {
  yield all([takeEvery(showActions.LOAD_SHOWS, loadShows)]);
}
