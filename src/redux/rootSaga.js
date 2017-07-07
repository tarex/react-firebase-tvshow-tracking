import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import showSagas from './show/sagas';
import watchSagas from './watchlist/sagas';

export default function* rootSaga(getState) {
  yield all([authSagas(), showSagas(), watchSagas()]);
}
