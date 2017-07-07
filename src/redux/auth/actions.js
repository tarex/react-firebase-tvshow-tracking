const authActions = {
  LOGIN: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',

  LOGOUT: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERROR: 'LOGOUT_ERROR',

  SYNC_USER: 'SYNC_USER',

  login: authProvider => ({
    type: authActions.LOGIN,
    payload: { authProvider },
  }),

  loginSuccess: authUser => ({
    type: authActions.LOGIN_SUCCESS,
    payload: { authUser },
  }),

  loginError: error => ({
    type: authActions.LOGIN_ERROR,
    payload: { error },
  }),

  logout: () => ({
    type: authActions.LOGOUT,
  }),

  logoutSuccess: () => ({
    type: authActions.LOGOUT_SUCCESS,
  }),

  logoutError: error => ({
    type: authActions.LOGOUT_ERROR,
    payload: { error },
  }),

  syncUser: user => ({
    type: authActions.SYNC_USER,
    payload: { user },
  }),
};

export default authActions;
