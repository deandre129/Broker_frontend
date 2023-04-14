import AffiliateLinkService from '@/modules/affiliateLink/affiliateLinkService';
import Errors from '@/modules/shared/error/errors';

const affiliateLinkHomeActions = {
  doRedirect: (url) => async () => {
    try {
      const record = await AffiliateLinkService.home(url);

      if (record) {
        window.open(record.link);
        return;
      }
    } catch (error) {
      Errors.handle(error);
    }
  },
};

export default affiliateLinkHomeActions;
