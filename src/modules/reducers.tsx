import { combineReducers } from 'redux';
import test from '@/modules/test/testReducer'
import broker from '@/modules/broker/brokerReducers';
import author from './author/home/authorHomeReducers';
import category from './category/categoryReducers';
import page from './page/pageReducers';
import brokerArticle from './brokerArticle/brokerArticleReducers';
import navigation from './navigation/navigationReducers';
import promotion from './promotion/promotionReducers';
import mui from './mui/muiReducers';
import form from './form/formReducers';
import blog from './blog/blogReducers';

export default combineReducers({
  test,
  author,
  blog,
  broker,
  brokerArticle,
  category,
  form,
  navigation,
  page,
  promotion,
  mui,
});