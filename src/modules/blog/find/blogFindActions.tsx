import BlogService from '@/modules/blog/blogService';
import selectors from '@/modules/blog/home/blogHomeSelectors';
import Errors from '@/modules/shared/error/errors';
import config from '@/config';

const prefix = 'BLOG_FIND_LIST';

const blogFindActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (url) => async (dispatch) => {
    try {
      dispatch({
        type: blogFindActions.FIND_STARTED,
      });

      let record = await BlogService.findByURL(url);

      if (record === '') {
        record = null;
      }

      dispatch({
        type: blogFindActions.FIND_SUCCESS,
        payload: record,
      });

      if (!record) {
        window.open(config.frontendUrl.protocol+"://"+config.frontendUrl.host+"/404");
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: blogFindActions.FIND_ERROR,
      });
    }
  },
};

export default blogFindActions;
