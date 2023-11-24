import { NavigationContainer } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '../hooks';
import { navigationRef } from './NavigationServices';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import ApplicationNavigator from './stack/AppicationNavigator';

const Stack = createStackNavigator();

function ApplicationStack() {
  const { NavigationTheme } = useTheme();

  const StackScreen = useMemo(() => {
    return ApplicationNavigator();
  }, []);

  const onNavigationStateChange = useCallback(async () => {}, []);
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <NavigationContainer
        theme={NavigationTheme}
        ref={navigationRef}
        onStateChange={onNavigationStateChange}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: Platform.select({
              android: CardStyleInterpolators.forFadeFromBottomAndroid,
              ios: CardStyleInterpolators.forHorizontalIOS,
            }),
          }}
        >
          {StackScreen}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default memo(ApplicationStack);
