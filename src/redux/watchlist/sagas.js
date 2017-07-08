import {
  put,
  take,
  call,
  takeEvery,
  fork,
  all,
  select,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import watchActions from './actions';
import { RSF, FirebaseAuth } from '../../helper/firebase';

function* handleWatchlist({ payload }) {
  const { uid, show } = payload;
  const watchListRef = `watchlist/${uid}/${show.id}`;
  const seriesUserRef = `seriesUser/${show.id}/${uid}`;
  const existingItem = yield call(RSF.database.read, watchListRef);

  if (existingItem) {
    yield call(RSF.database.delete, watchListRef);
    yield call(RSF.database.delete, seriesUserRef);
  } else {
    yield call(RSF.database.update, watchListRef, show);
    yield call(RSF.database.update, seriesUserRef, true);
  }
  yield put(watchActions.watchlistSuccss(existingItem ? 'remove' : 'add'));
}

function* listenWatchList({ payload }) {
  const { uid } = payload;
  const channel = yield call(RSF.database.channel, `/watchlist/${uid}`);
  while (true) {
    const { value: shows } = yield take(channel);
    yield put(watchActions.updateWatchlist(shows));
  }
}

export default function* watchSagas() {
  yield all([
    takeEvery(watchActions.WATCHLIST, handleWatchlist),
    takeEvery(watchActions.LISTEN_WATCHLIST, listenWatchList),
  ]);
}
