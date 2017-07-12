import { takeEvery, put, call, fork, take, all } from 'redux-saga/effects';
import authActions from './actions';
import {
  RSF,
  getFirebaseAuthProvider,
  setFCMPerssionToken,
} from '../../helper/firebase';
import WatchActions from '../watchlist/actions';

function* watchLogin({ payload }) {
  try {
    const authProvider = yield getFirebaseAuthProvider(payload.authProvider);
    const authUser = yield call(RSF.auth.signInWithPopup, authProvider);
    yield put(authActions.loginSuccess(authUser));
  } catch (error) {
    yield put(authActions.loginError(error));
  }
}

function* watchLogout() {
  try {
    yield call(RSF.auth.signOut);
    yield put(authActions.logoutSuccess());
  } catch (error) {
    yield put(authActions.logoutError(error));
  }
}

function* syncUserSaga() {
  const channel = yield call(RSF.auth.channel);
  while (true) {
    const { error, user } = yield take(channel);
    if (user) {
      yield put(WatchActions.listen(user));
      yield put(authActions.syncUser(user));
      yield setFCMPerssionToken(user.uid);
    } else {
      yield put(authActions.syncUser(null));
    }
  }
}

export default function* authSagas() {
  yield fork(syncUserSaga);
  yield all([
    takeEvery(authActions.LOGIN, watchLogin),
    takeEvery(authActions.LOGOUT, watchLogout),
  ]);
}
