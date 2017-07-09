import { createSelector } from 'reselect';

const getSuggestionFormat = ({ suggestions }) => {
  const allShows = {};
  Object.keys(suggestions).forEach(showId => {
    allShows[showId] = suggestions[showId].name;
  });
  return allShows;
};

export const getSuggestion = createSelector(
  state => state.shows,
  shows => getSuggestionFormat(shows.toJS()),
);
