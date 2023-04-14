import { createSelector } from 'reselect';

const selectRaw = (state) => state.blog.find;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const pageFindSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default pageFindSelectors;
