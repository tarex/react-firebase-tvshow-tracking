import * as functions from 'firebase-functions';
import admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const getFirebaseData = async url =>
  await admin
    .database()
    .ref(url)
    .once('value')
    .then(snap => snap.val())
    .catch(error => error);

export { functions, admin, getFirebaseData };
