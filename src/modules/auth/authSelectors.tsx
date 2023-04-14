import { createSelector } from 'reselect';
import AuthCurrentTenant from './authCurrentTenant';
import { tenantSubdomain } from '../tenant/tenantSubdomain';
import _get from 'lodash/get';

const selectRaw = (state) => state.auth;

const selectAuthenticationUser = createSelector(
  [selectRaw],
  (auth) => auth.authenticationUser,
);

const selectCurrentUser = createSelector(
  [selectRaw],
  (auth) => auth.currentUser,
);

const selectCurrentTenant = createSelector(
  [selectRaw],
  (raw) => {
    return raw.currentTenant;
  },
);

const selectCurrentUserEmail = createSelector(
  [selectCurrentUser],
  (currentUser) => (currentUser ? currentUser.email : null),
);

const selectCurrentUserFullName = createSelector(
  [selectCurrentUser],
  (currentUser) =>
    currentUser ? currentUser.fullName : '',
);

const selectLoadingInit = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingInit),
);

const selectLoadingContact = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingContact),
);

const authSelectors = {
  selectLoadingContact,
  selectCurrentUser,
  selectCurrentTenant
};

export default authSelectors;
