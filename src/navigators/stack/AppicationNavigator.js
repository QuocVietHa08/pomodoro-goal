import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import RouteName from '../RouteName';
import {
  Task,
  Home,
  TodayTask,
  Notification,
  Timer,
  NewTask,
  Category,
} from '../../screens';
import { Platform } from 'react-native';
import AppBottomTab from './AppBottomTab';

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
      <Stack.Screen name={RouteName.AppBottomTab} options={screenOptions}>
        {props => <AppBottomTab {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name={RouteName.NewTask}
        options={screenOptions}
        component={NewTask}
      />
      <Stack.Screen
        name={RouteName.TodayTask}
        options={screenOptions}
        component={TodayTask}
      />
      <Stack.Screen
        name={RouteName.Task}
        options={screenOptions}
        component={Home}
      />
      <Stack.Screen
        name={RouteName.Notification}
        options={screenOptions}
        component={Notification}
      />
      <Stack.Screen
        name={RouteName.Timer}
        options={screenOptions}
        component={Timer}
      />
      <Stack.Screen
        name={RouteName.Category}
        options={screenOptions}
        component={Category}
      />
    </>
  );
};

export default ApplicationNavigator;
