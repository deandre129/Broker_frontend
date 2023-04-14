import sidebar from '@/modules/category/sidebar/categorySidebarReducers';
import footer from '@/modules/category/footer/categoryFooterReducers';
import home from '@/modules/category/home/categoryHomeReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  sidebar,
  footer,
  home,
});
