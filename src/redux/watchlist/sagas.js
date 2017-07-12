import {
  put,
  take,
  call,
  takeEvery,
  takeLatest,
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
    yield all([
      call(RSF.database.delete, watchListRef),
      call(RSF.database.delete, seriesUserRef),
    ]);
  } else {
    yield all([
      call(RSF.database.update, watchListRef, show),
      call(RSF.database.update, seriesUserRef, true),
    ]);
  }
  yield put(watchActions.watchlistSuccss(existingItem ? 'remove' : 'add'));
}

const getuid = state => {
  const auth = state.auth.toJS();
  if (auth.user !== null) return auth.user.uid;
  return null;
};

export function* listenWatchList() {
  const uid = yield select(getuid);
  if (uid && uid !== null) {
    const channel = yield call(RSF.database.channel, `/watchlist/${uid}`);
    while (true) {
      const { value: shows } = yield take(channel);
      yield put(watchActions.updateWatchlist(shows));
    }
  }
}

export default function* watchSagas() {
  yield all([
    takeEvery(watchActions.LISTEN_WATCHLIST, listenWatchList),
    takeEvery(watchActions.WATCHLIST, handleWatchlist),
  ]);
}
