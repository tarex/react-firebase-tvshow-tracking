import { store } from './store';
import { FirebaseAuth, setFCMPerssionToken } from '../helper/firebase';
import AuthActions from './auth/actions';
import WatchActions from './watchlist/actions';
import ShowActions from './show/actions';

export default () => new Promise((resolve, reject) => {
  store.dispatch(ShowActions.loadShows());
  const unsub = FirebaseAuth.onAuthStateChanged(
    user => {
      if (user !== null) {
        store.dispatch(AuthActions.syncUser(user));
        store.dispatch(WatchActions.listen(user));
        setFCMPerssionToken(user.uid);
      }
      unsub();
      resolve();
    },
    error => reject(error),
  );
});
