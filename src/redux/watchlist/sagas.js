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
  const { ref, data } = payload;
  const existingItem = yield call(RSF.database.read, ref);
  if (existingItem) {
    yield call(RSF.database.delete, ref);
  } else {
    yield call(RSF.database.update, ref, data);
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
