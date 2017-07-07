// import { FirebaseAuth } from '../../helper/firebase';
// import authActions from './actions';
// import watchActions from '../watchlist/actions';
// Need to remove this from here, more appropiate place needed for this one.
// export function initAuth(dispatch) {
//   return new Promise((resolve, reject) => {
//     const unsub = FirebaseAuth.onAuthStateChanged(
//       user => {
//         dispatch(authActions.syncUser(user));
//         dispatch(watchActions.listen(user));
//         unsub();
//         resolve();
//       },
//       error => reject(error),
//     );
//   });
// }
