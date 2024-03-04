import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistConfig from '../persistConfig';

const initialState = {
  showBottomTabStatus: true,
  theme: 'light',
};
const appSlice = createSlice({
  name: 'appReducer',
  initialState: { ...initialState },
  reducers: {
    setTheme: (state, action) => {
      return {
        ...state,
        theme: action.payload,
      };
    },
    setStatusBottomTab: (state, action) => {
      return {
        ...state,
        showBottomTabStatus: action.payload,
      };
    },
  },
});

export const { setStatusBottomTab, setTheme } = appSlice.actions;

const appReducer = appSlice.reducer;
export default persistReducer(
  persistConfig({
    key: 'appReducer',
    whitelist: [''],
  }),
  appReducer,
);
