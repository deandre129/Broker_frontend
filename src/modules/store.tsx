import initializers from '@/modules/initializers';
import createRootReducer from '@/modules/reducers';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk';
import { useMemo } from 'react';

let store;

export const initStore = ({initialState, context}) => {
  return createStore(
    createRootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware.withExtraArgument(context))),
  )
}

export function configureStore(preloadedState?) {
  
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  for (const initializer of initializers) {
    initializer(_store);
  }

  return _store;
}

export function useStore(initialState) {
  // const store = useMemo(() => configureStore(initialState), [initialState])
  // return store;
  return configureStore(initialState)
}
