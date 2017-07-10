import 'babel-polyfill';
import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import cors from 'cors';
import express from 'express';

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(cors({ origin: true }));

const getFirebaseData = url =>
  new Promise((resolve, reject) =>
    admin
      .database()
      .ref(url)
      .once('value')
      .then(snap => resolve(snap.val()))).catch(error => reject(error));

const getSeriesWithTokens = (
  dailylist,
  possibleNotificationCandidate,
  seriesWithUser,
  users,
) =>
  new Promise((resolve, reject) => {
    const notificationCandidate = {};
    possibleNotificationCandidate.forEach(showId => {
      notificationCandidate[showId] = {};
      const possibleUsers = Object.keys(seriesWithUser[showId]);
      possibleUsers.length &&
        possibleUsers.forEach(userId => {
          //new Date(dailylist[showId].airstamp) - new Date() < 15 * 60000
          if (1 == 1) {
            notificationCandidate[showId]['tokens'] = [
              ...('tokens' in notificationCandidate[showId]
                ? notificationCandidate[showId].tokens
                : {}),
              ...Object.keys(users[userId].tokens),
            ];
          }
        });

      notificationCandidate[showId]['details'] = dailylist[showId];
    });
    resolve(notificationCandidate);
  });

app.get('/', async (req, res) => {
  // need authorization
  const seriesWithUser = await getFirebaseData('seriesUser');
  const users = await getFirebaseData('users');
  const dailylist = await getFirebaseData('dailylist');

  const seriesWithUserIds = new Set(Object.keys(seriesWithUser));
  const dailylistIds = new Set(Object.keys(dailylist));

  const possibleNotificationCandidate = new Set(
    [...seriesWithUserIds].filter(x => dailylistIds.has(x)),
  );

  const seriesWithTokens = await getSeriesWithTokens(
    dailylist,
    possibleNotificationCandidate,
    seriesWithUser,
    users,
  );
  Object.keys(seriesWithTokens).forEach(seriesId => {
    const series = seriesWithTokens[seriesId].details;
    const payload = {
      notification: {
        title: series.name,
        body: series.episodeName,
        click_action: `https://tvapp-ea52d.firebaseapp.com/tv/${series.id}`,
      },
    };
    admin
      .messaging()
      .sendToDevice(seriesWithTokens[seriesId].tokens, payload)
      .then(response => {
        console.log(series.name);
      })
      .catch(error => {
        console.log(error);
      });
  });

  res.json({
    seriesWithTokens,
  });
});

export const api = functions.https.onRequest((req, res) => {
  if (!req.path) {
    req.url = `/${req.url}`;
  }
  return app(req, res);
});

// Hooks
export const saveUserForSettings = functions.auth.user().onCreate(event => {
  const { uid } = event.data;
  const userRef = admin.database().ref(`/users/${uid}`);
  return userRef.set({
    displayName: event.data.displayName,
    email: event.data.email || '',
    photoURL: event.data.photoURL || '',
  });
});

//
// notificationCandidate[showId] = {
//   tokens: {
//     ...(notificationCandidate[showId]
//       ? notificationCandidate[showId].tokens
//       : {}),
//     ...Object.keys(users[userId].tokens),
//   },
// };
