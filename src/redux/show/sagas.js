import { takeEvery, put, call, fork, take, all } from 'redux-saga/effects';
import { TVAPI } from '../../helper/utility/superFetch';
import showActions from './actions';

export const loadTvShows = ({ day }) => new Promise((resolve, reject) => {
  TVAPI(day).then(list => resolve(list)).catch(error => reject(error));
});

// const generateUrl = list => {
//   switch (list) {
//     case 'topratedList':
//       return 'top_rated';
//     case 'recentList':
//       return 'on_the_air';
//     default:
//       return 'popular';
//   }
// };

function* loadShows({ payload }) {
  try {
    //  const url = generateUrl(payload.list);
    const shows = yield call(loadTvShows, { day: payload.day });
    yield put(showActions.loadSuccess(payload.list, shows));
  } catch (error) {
    yield put(showActions.loadError(error));
  }
}

export default function* showSagas() {
  yield all([takeEvery(showActions.LOAD_SHOWS, loadShows)]);
}
