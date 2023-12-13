import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authReducer';
import theme from './theme';
import { api } from 'src/services/api';
const rootReducer = combineReducers({
  authReducer,
  theme,
  [api.reducer]: api.reducer,
});

export default rootReducer;
