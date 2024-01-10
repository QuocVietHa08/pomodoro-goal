import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistConfig from '../persistConfig';

const initialState = {
  showBottomTabStatus: true,
};
const appSlice = createSlice({
  name: 'appReducer',
  initialState: { ...initialState },
  reducers: {
    setStatusBottomTab: (state, action) => {
      return {
        ...state,
        showBottomTabStatus: action.payload,
      };
    },
  },
});

export const { setStatusBottomTab } = appSlice.actions;

const appReducer = appSlice.reducer;
export default persistReducer(
  persistConfig({
    key: 'appReducer',
    whitelist: [''],
  }),
  appReducer,
);
