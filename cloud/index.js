import 'babel-polyfill';
import express from 'express';
import cors from 'cors';
import { functions, admin, getFirebaseData } from './firebase';
import { getSeriesWithTokens } from './token';

const app = express();
app.use(cors({ origin: true }));

app.get('/', async (req, res) => {
  // need authorization
  // need to use promise all
  const seriesWithUser = await getFirebaseData('seriesUser');
  const users = await getFirebaseData('users');
  const dailylist = await getFirebaseData('dailylist');

  const seriesWithUserIds = new Set(Object.keys(seriesWithUser));
  const dailylistIds = new Set(Object.keys(dailylist));

  const possibleNotificationCandidate = new Set(
    [...seriesWithUserIds].filter(x => dailylistIds.has(x)),
  );

  const seriesWithTokens = getSeriesWithTokens(
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
  if (!req.path) req.url = `/${req.url}`;
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
