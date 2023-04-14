import forexStrategy from '@/modules/navigation/forexStrategy/navigationForexStrategyReducers';
import forexSchool from '@/modules/navigation/forexSchool/navigationForexSchoolReducers';
import mostRead from '@/modules/navigation/mostRead/navigationMostReadReducers';
import home from '@/modules/navigation/home/navigationHomeReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  forexStrategy,
  forexSchool,
  mostRead,
  home,
});
