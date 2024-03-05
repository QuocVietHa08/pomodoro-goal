import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store';
import './translations';
import ApplicationStack from './navigators/ApplicationStack';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApplicationStack />
    </PersistGate>
  </Provider>
);
export default App;
