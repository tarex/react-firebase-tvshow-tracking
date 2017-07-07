import config from '../../config';

// const TVAPI = (endpoint, page = 1) => {
//   return fetch(
//     `${config.tmdb.url}/${endpoint}?api_key=${config.tmdb.key}&page=${page}&language=en-US`,
//     {
//       method: 'GET',
//       mode: 'cors',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     },
//   ).then(res => res.json());
// };

const getDate = (day = 0) => {
  if (day !== 0) {
    const previousDay = new Date() - 1000 * 60 * 60 * 24 * day;
    return previousDay.toISOString.slice(0, 10);
  }
  return new Date().toISOString().slice(0, 10);
};

// `${config.tvurl}/schedule?country=GB&date=${getDate(day)}

const TVAPI = (day = 0) => {
  return fetch(`${config.tvurl}/schedule?country=CN&date=${getDate(day)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(res => res.json());
};

export { TVAPI };
