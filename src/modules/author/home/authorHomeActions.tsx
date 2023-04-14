import AuthorService from '@/modules/author/authorService';
import Errors from '@/modules/shared/error/errors';

const prefix = 'AUTHOR_HOME';

const authorHomeActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: () => async (dispatch) => {
    try {
      dispatch({
        type: authorHomeActions.FIND_STARTED,
      });

      const record = await AuthorService.first();

      dispatch({
        type: authorHomeActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      // Errors.handle(error);

      // dispatch({
      //   type: authorHomeActions.FIND_ERROR,
      // });
    }
  },
};

export default authorHomeActions;
