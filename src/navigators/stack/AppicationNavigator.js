import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import RouteName from '../RouteName';
import { Task, Home } from '../../screens';
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
        component={Home}
      />
      <Stack.Screen
        name={RouteName.Task}
        options={screenOptions}
        component={Home}
      />
    </>
  );
};

export default ApplicationNavigator;
