import { createSelector } from 'reselect';

export const getAuth = createSelector(state => state.auth, auth => auth.toJS());
