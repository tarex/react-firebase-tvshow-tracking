import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';
import config from '../../config';

const FirebaseApp = firebase.initializeApp(config.firebase);
export const FirebaseDB = firebase.database();
firebase.database.enableLogging(false, false);
export const FirebaseAuth = firebase.auth();
export const RSF = new ReduxSagaFirebase(FirebaseApp);
const messaging = firebase.messaging();
export const getFirebaseAuthProvider = provider => {
  switch (provider) {
    case 'facebook':
      return new firebase.auth.FacebookAuthProvider();
    case 'google':
      return new firebase.auth.GoogleAuthProvider();
    case 'github':
      return new firebase.auth.GithubAuthProvider();
    case 'twitter':
      return new firebase.auth.TwitterAuthProvider();
    default:
      return null;
  }
};

export { firebase, messaging };
