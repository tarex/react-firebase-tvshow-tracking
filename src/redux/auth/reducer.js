import { Record } from 'immutable';
import authActions from './actions';

const initialState = new Record({
  loading: false,
  authenticated: false,
  user: null,
});

export default function authReducer(
  state = new initialState(),
  { type, payload },
) {
  switch (type) {
    case authActions.LOGIN:
    case authActions.LOGOUT:
      return state.merge({
        loading: true,
      });

    case authActions.LOGIN_SUCCESS:
      return state.merge({
        loading: false,
        authenticated: true,
      });
    case authActions.LOGOUT_SUCCESS:
      return new initialState();

    case authActions.LOGIN_ERROR:
    case authActions.LOGOUT_ERROR:
      return state.merge({
        loading: false,
        errorMessage: payload.error,
      });

    case authActions.SYNC_USER:
      return state.merge({
        authenticated: payload.user != null,
        user: payload.user,
      });

    default:
      return state;
  }
}
