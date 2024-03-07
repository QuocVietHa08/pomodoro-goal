import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store';
import './translations';
import ApplicationStack from './navigators/ApplicationStack';
import { ToastProvider } from 'react-native-toast-notifications';
import CustomToast from './components/Toast';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastProvider
        placement="top"
        duration={1000}
        renderToast={toast => <CustomToast toast={toast} />}
      >
        <ApplicationStack />
      </ToastProvider>
    </PersistGate>
  </Provider>
);
export default App;
