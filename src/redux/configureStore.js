import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers'

import { useMemo } from 'react'
import thunk from 'redux-thunk'


import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'userPersist',
  storage: storage,
  whitelist: ['user'] // which reducer want to store
};
const pReducer = persistReducer(persistConfig, reducers);

let store
let persistor

function initStore(initialState) {
  return createStore(
    //reducers,
    pReducer,
    initialState,
    applyMiddleware(thunk))
  
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
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
  persistor = persistStore(store);
  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}



export { persistor};