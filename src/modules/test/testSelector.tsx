import { createSelector } from 'reselect';

const getClick = (state) => state.test;

export const getActiveClick = createSelector(
  [getClick],
  (test) => test.click,
);