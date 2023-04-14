import comparable from '@/modules/broker/comparable/brokerComparableReducers';
import comparison from '@/modules/broker/comparison/brokerComparisonReducers';
import featured from '@/modules/broker/featured/brokerFeaturedReducers';
import top from '@/modules/broker/top/brokerTopReducers';
import home from '@/modules/broker/home/brokerHomeReducers';
import view from './view/brokerViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  comparable,
  comparison,
  featured,
  top,
  home,
  view
});
