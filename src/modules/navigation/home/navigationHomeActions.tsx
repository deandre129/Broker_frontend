import NavigationService from '@/modules/navigation/navigationService';
import Errors from '@/modules/shared/error/errors';

const prefix = 'NAVIGATION_HOME';

const navigationHomeActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  doFetch: () => async (dispatch, getState) => {
    try {
      dispatch({
        type: navigationHomeActions.FETCH_STARTED,
      });

      const response = await NavigationService.home();

      dispatch({
        type: navigationHomeActions.FETCH_SUCCESS,
        payload: response,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: navigationHomeActions.FETCH_ERROR,
      });
    }
  },
};

export default navigationHomeActions;
