import service from '@/modules/auth/authService';
import Errors from '@/modules/shared/error/errors';
import Message from '@/components/shared/message';
import i18n from '@/i18n';
import { AuthToken } from '@/modules/auth/authToken';
import AuthCurrentTenant from '@/modules/auth/authCurrentTenant';
import selectors from '@/modules/auth/authSelectors';
import { tenantSubdomain } from '../tenant/tenantSubdomain';
import muiActions from '@/modules/mui/muiActions';

const prefix = 'AUTH';

const authActions = {
  ERROR_MESSAGE_CLEARED: `${prefix}_ERROR_MESSAGE_CLEARED`,

  CONTACT_START: `${prefix}_CONTACT_START`,
  CONTACT_SUCCESS: `${prefix}_CONTACT_SUCCESS`,
  CONTACT_ERROR: `${prefix}_CONTACT_ERROR`,


  doSendContact:
    (
      name,
      email,
      subject,
      content,
      recaptcha,
      fnSuccess = null,
    ) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: authActions.CONTACT_START,
        });
        await service.sendContact(
          name,
          email,
          subject,
          content,
          recaptcha,
        );
        Message.success(i18n.auth.contactSuccess);
        dispatch({
          type: authActions.CONTACT_SUCCESS,
        });
        fnSuccess && fnSuccess();
      } catch (error) {
        Errors.handle(error);
        dispatch({
          type: authActions.CONTACT_ERROR,
        });
      }
    },

};

export default authActions;
