import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import RouteName from '../RouteName';
import { Startup, StartScreen, Login } from '../../screens';
import { Platform } from 'react-native';

const screenOptions = {
  headerShow: false,
  cardStyleInterpolator: Platform.select({
    android: CardStyleInterpolators.forFadeFromBottomAndroid,
    ios: CardStyleInterpolators.forScaleFromCenterAndroid,
  }),
};

const Stack = createStackNavigator();

const ApplicationNavigator = props => {
  return (
    <>
      <Stack.Screen
        name={RouteName.Home}
        options={screenOptions}
        component={StartScreen}
      />
      <Stack.Screen
        name={RouteName.Login}
        options={screenOptions}
        component={Login}
      />
    </>
  );
};

export default ApplicationNavigator;