/* eslint-disable react-hooks/rules-of-hooks */
import Message from '@/components/shared/message';
import i18n from '@/i18n';
import config from '@/config';

const DEFAULT_ERROR_MESSAGE = i18n.errors.defaultErrorMessage;

function selectErrorKeyOrMessage(error) {
  if (error && error.response && error.response.data) {
    const data = error.response.data;

    if (data.error && data.error.message) {
      return data.error.message;
    }

    return String(data);
  }

  return error.message || DEFAULT_ERROR_MESSAGE;
}

function selectErrorMessage(error) {
  const key = selectErrorKeyOrMessage(error);

  if (i18n[key]) {
    return i18n[key];
  }

  return key;
}

function selectErrorCode(error) {
  if (error && error.response && error.response.status) {
    return error.response.status;
  }

  return 500;
}
export default class Errors {
  
  static handle(error) {

    if (process.env.NODE_ENV !== 'test') {
      console.error(selectErrorMessage(error));
      console.error(error);
    }

    if (selectErrorCode(error) === 403) {
      window.open(config.frontendUrl.protocol+"://"+config.frontendUrl.host+"/403");
      return;
    }

    if ([400, 429].includes(selectErrorCode(error))) {
      Message.error(selectErrorMessage(error));
      return;
    }

    window.open(config.frontendUrl.protocol+"://"+config.frontendUrl.host+"/500");
  }

  static errorCode(error) {
    return selectErrorCode(error);
  }

  static selectMessage(error) {
    return selectErrorMessage(error);
  }

  static showMessage(error) {
    Message.error(selectErrorMessage(error));
  }
}
