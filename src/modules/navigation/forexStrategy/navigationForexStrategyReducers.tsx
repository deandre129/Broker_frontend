import actions from '@/modules/navigation/forexStrategy/navigationForexStrategyActions';

const initialData = {
  loading: false,
  navigation: [],
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      navigation: payload,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      navigation: [],
    };
  }

  return state;
};
