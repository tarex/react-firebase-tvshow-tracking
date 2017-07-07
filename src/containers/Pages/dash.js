import React from 'react';
import { connect } from 'react-redux';
// import TVGrid from '../TvGrid/grid';

const linear = shows => {
  const allShows = [];
  Object.keys(shows).forEach(show => {
    allShows.push(shows[show]);
  });
  return allShows;
};

export default connect(state => ({}), {})(({ series, myshows }) => {
  return (
    <div>
      Dashboard
    </div>
  );
});
