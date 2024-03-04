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
  AllCompletedTask,
  EditProfile,
  AppSetting,
  ReminderRingTone,
  NotificationSetting,
  Security,
  UpgradeApp,
  CompletedTimer,
  Profile,
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
        name={RouteName.Profile}
        options={screenOptions}
        component={Profile}
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
      <Stack.Screen
        name={RouteName.AllCompletedTask}
        options={screenOptions}
        component={AllCompletedTask}
      />
      <Stack.Screen
        name={RouteName.EditProfile}
        options={screenOptions}
        component={EditProfile}
      />
      <Stack.Screen
        name={RouteName.AppSetting}
        options={screenOptions}
        component={AppSetting}
      />
      <Stack.Screen
        name={RouteName.ReminderRingTone}
        options={screenOptions}
        component={ReminderRingTone}
      />
      <Stack.Screen
        name={RouteName.NotificationSetting}
        options={screenOptions}
        component={NotificationSetting}
      />
      <Stack.Screen
        name={RouteName.Security}
        options={screenOptions}
        component={Security}
      />
      <Stack.Screen
        name={RouteName.UpgradeApp}
        options={screenOptions}
        component={UpgradeApp}
      />
      <Stack.Screen
        name={RouteName.NewTask}
        options={screenOptions}
        component={NewTask}
      />
      <Stack.Screen
        name={RouteName.CompletedTimer}
        options={screenOptions}
        component={CompletedTimer}
      />
    </>
  );
};

export default ApplicationNavigator;
