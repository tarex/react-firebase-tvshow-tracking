export const getSeriesWithTokens = (
  dailylist,
  possibleNotificationCandidate,
  seriesWithUser,
  users,
) => {
  const notificationCandidate = {};
  possibleNotificationCandidate.forEach(showId => {
    notificationCandidate[showId] = {};
    const possibleUsers = Object.keys(seriesWithUser[showId]);
    possibleUsers.length &&
      possibleUsers.forEach(userId => {
        if (new Date(dailylist[showId].airstamp) - new Date() < 15 * 60000) {
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
  return notificationCandidate;
};
