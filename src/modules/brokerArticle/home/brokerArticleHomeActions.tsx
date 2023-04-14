import BrokerArticleService from '@/modules/brokerArticle/brokerArticleService';
import Errors from '@/modules/shared/error/errors';
import config from '@/config';

const prefix = 'BROKER_ARTICLE_HOME';

const brokerArticleHomeActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (url) => async (dispatch) => {
    try {
      dispatch({
        type: brokerArticleHomeActions.FIND_STARTED,
      });

      let record = await BrokerArticleService.findByURL(
        url,
      );

      if (record === '') {
        record = null;
      }

      dispatch({
        type: brokerArticleHomeActions.FIND_SUCCESS,
        payload: record,
      });

      if (!record) {
        window.open(config.frontendUrl.protocol+"://"+config.frontendUrl.host+"/404");
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: brokerArticleHomeActions.FIND_ERROR,
      });
    }
  },
};

export default brokerArticleHomeActions;
