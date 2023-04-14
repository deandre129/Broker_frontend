import home from '@/modules/blog/home/blogHomeReducers';
import find from './find/blogFindReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  home,
  find
});
