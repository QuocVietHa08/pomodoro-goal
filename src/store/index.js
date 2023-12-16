import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import createSagaMiddleware from 'redux-saga';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { createLogger } from 'redux-logger';
import { MMKV } from 'react-native-mmkv';
import rootReducer from './rootReducer';
import { api } from 'src/services/api';

const storage = new MMKV();
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const logger = createLogger();
if (__DEV__) {
  middleware.push(logger);
}
export const reduxStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['theme', 'auth'],
};
//

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleware);
    return middlewares;
  },
  devTools: __DEV__,
});
const persistor = persistStore(store);
setupListeners(store.dispatch);
export { store, persistor };
