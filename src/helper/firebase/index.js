import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';
import config from '../../config';

const FirebaseApp = firebase.initializeApp(config.firebase);

export const RSF = new ReduxSagaFirebase(FirebaseApp);

export const FirebaseDB = firebase.database();
// firebase.database.enableLogging(false, false);
export const FirebaseAuth = firebase.auth();
export const FirebaseMsg = firebase.messaging();

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

export const listenFCMNotification = () =>
  FirebaseMsg.onMessage(payload => payload.notification);

export const getFCMPermission = () =>
  FirebaseMsg.requestPermission()
    .then(() => FirebaseMsg.getToken())
    .catch(err => {
      console.log(err.message);
    });

// did't bothered actions
export const setFCMPerssionToken = uid => {
  getFCMPermission().then(token => {
    console.log(uid);
    FirebaseDB.ref(`users/${uid}/tokens/${token}`).set(true);
  });
};

export { firebase };
