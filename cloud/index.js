import 'babel-polyfill';
import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import cors from 'cors';
import express from 'express';

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(cors({ origin: true }));

const getFirebaseData = url =>
  new Promise(resolve =>
    admin.database().ref(url).once('value').then(snap => resolve(snap.val())));

// const getUsersDate = timzone => {
//   const date = new Date();
//   const utc = date.getTime() + date.getTimezoneOffset() * 60000;
//   return new Date(utc + 3600000 * timzone); // hour * difference +-
// };

const getSeriesWithTokens = (
  dailylist,
  possibleNotificationCandidate,
  seriesWithUser,
  users,
) =>
  new Promise((resolve, reject) => {
    const notificationCandidate = {};
    possibleNotificationCandidate.forEach(showId => {
      const possibleUsers = Object.keys(seriesWithUser[showId].users);
      possibleUsers.length &&
        possibleUsers.forEach(userId => {
          if (
            new Date(dailylist[showId].airstamp) - new Date() < 15 * 60000 // 15 min
          ) {
            notificationCandidate[showId] = {
              tokens: {
                ...notificationCandidate[showId].tokens,
                ...Object.keys(users[userId].tokens),
              },
            };
          }
        });
      notificationCandidate[showId] = {
        ...notificationCandidate[showId],
        details: {
          ...dailylist[showId],
        },
      };
    });
  });

// every 15 min
app.get('/', async (req, res) => {
  // need authorization
  const seriesWithUser = await getFirebaseData('dummySeriesUser');
  const users = await getFirebaseData('users');
  const dailylist = await getFirebaseData('dailylist');
  const timezoneUserList = await getFirebaseData('dummyTimezoneUser');
  const seriesWithUserIds = new Set(Object.keys(seriesWithUser));
  const dailylistIds = new Set(Object.keys(dailylist));

  const possibleNotificationCandidate = new Set(
    [...watchlistIds].filter(x => dailylistIds.has(x)),
  );
  const notificationCandidate = {};
  const seriesWithTokens = await getSeriesWithTokens(
    dailylist,
    possibleNotificationCandidate,
    seriesWithUser,
    users,
  );

  // send push notification.

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
  const { uid, displayName, email, photoURL } = event.data;
  const userRef = admin.database().ref(`/users/${uid}`);
  return userRef.set({
    displayName,
    email,
    photoURL,
  });
});
