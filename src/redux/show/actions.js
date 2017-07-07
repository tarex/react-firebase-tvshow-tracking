const showActions = {
  LOAD_SHOWS: 'LOAD_SHOWS',
  LOAD_SHOWS_SUCCESS: 'LOAD_SHOWS_SUCCESS',
  LOAD_SHOWS_ERROR: 'LOAD_SHOWS_ERROR',

  LOAD_SHOW_MODAL: 'LOAD_SHOW_MODAL',

  loadShows: (list, day = 0) => ({
    type: showActions.LOAD_SHOWS,
    payload: { list, day },
  }),

  loadShowModal: data => ({
    type: showActions.LOAD_SHOW_MODAL,
    payload: { data },
  }),

  loadSuccess: (list, shows) => ({
    type: showActions.LOAD_SHOWS_SUCCESS,
    payload: {
      list,
      shows,
    },
  }),

  loadError: error => ({
    type: showActions.LOAD_SHOWS_ERROR,
    payload: { error },
  }),
};

export default showActions;
