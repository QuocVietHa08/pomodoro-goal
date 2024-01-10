import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authReducer';
import theme from './theme';
import appReducer from './app/appReducer';
import { api } from 'src/services/api';
const rootReducer = combineReducers({
  authReducer,
  appReducer,
  theme,
  [api.reducer]: api.reducer,
});

export default rootReducer;
