import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import { RequestStatus } from 'src/utils/appConstant';
import persistConfig from '../persistConfig';

const initialState = {
  accessToken: '',
  password: '',
  email: '',
  loginStatus: '',
};
const authSlice = createSlice({
  name: 'authReducer',
  initialState: { ...initialState },
  reducers: {
    loginRequestAction: state => {
      return {
        ...state,
        loginStatus: RequestStatus.Request,
      };
    },
    loginRequestSuccessAction: (state, action) => {
      return {
        ...state,
        loginStatus: RequestStatus.Success,
        accessToken: action?.payload?.accessToken,
      };
    },
    loginRequestFailAction: (state, action) => {
      return {
        ...state,
        loginStatus: RequestStatus.Failure,
      };
    },
    setAccessToken: (state, action) => {
      return {
        ...state,
        accessToken: action.payload,
      };
    },
  },
});

export const {
  loginRequestAction,
  loginRequestSuccessAction,
  loginRequestFailAction,
  setAccessToken,
} = authSlice.actions;

const authReducer = authSlice.reducer;
export default persistReducer(
  persistConfig({
    key: 'authReducer',
    whitelist: [''],
  }),
  authReducer,
);
