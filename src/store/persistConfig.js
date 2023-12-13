import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = ({ key, whitelist = [] }) => ({
  key,
  version: 1,
  storage: AsyncStorage,
  timeout: 0,
  whitelist,
});

export default persistConfig;
