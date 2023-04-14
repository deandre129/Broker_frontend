/* eslint-disable import/no-anonymous-default-export */
import actions from '@/modules/auth/authActions';
import AuthCurrentTenant from '@/modules/auth/authCurrentTenant';

const initialData = {
  currentUser: null,
  currentTenant: null,
  loadingInit: true,
  loadingContact: false,
  loadingEmailConfirmation: false,
  loadingPasswordResetEmail: false,
  loadingPasswordChange: false,
  loadingVerifyEmail: false,
  loadingPasswordReset: false,
  loadingUpdateProfile: false,
  loading: false,
  errorMessage: null,
  errorMessageVerifyEmail: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.ERROR_MESSAGE_CLEARED) {
    return {
      ...state,
      errorMessage: null,
    };
  }

  if (type === actions.CONTACT_START) {
    return {
      ...state,
      loadingContact: true,
    };
  }

  if (type === actions.CONTACT_SUCCESS) {
    return {
      ...state,
      loadingContact: false,
    };
  }

  if (type === actions.CONTACT_ERROR) {
    return {
      ...state,
      loadingContact: false,
    };
  }

  return state;
};
