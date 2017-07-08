const showActions = {
  LOAD_SHOWS: 'LOAD_SHOWS',
  LOAD_SHOWS_SUCCESS: 'LOAD_SHOWS_SUCCESS',
  LOAD_SHOWS_ERROR: 'LOAD_SHOWS_ERROR',

  LOAD_SHOW_MODAL: 'LOAD_SHOW_MODAL',

  loadShows: (startFrom, limit) => ({
    type: showActions.LOAD_SHOWS,
    payload: { startFrom, limit },
  }),

  loadShowModal: data => ({
    type: showActions.LOAD_SHOW_MODAL,
    payload: { data },
  }),

  loadSuccess: shows => ({
    type: showActions.LOAD_SHOWS_SUCCESS,
    payload: {
      shows,
    },
  }),

  loadError: error => ({
    type: showActions.LOAD_SHOWS_ERROR,
    payload: { error },
  }),
};

export default showActions;
