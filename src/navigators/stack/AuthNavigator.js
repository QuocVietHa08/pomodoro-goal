import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import RouteName from '../RouteName';
import {
  Startup,
  StartScreen,
  Login,
  LoginWithPass,
  SignUp,
  FillProfile,
  Home,
  ForgotPass,
} from '../../screens';
import { Platform } from 'react-native';

const screenOptions = {
  headerShow: false,
  cardStyleInterpolator: Platform.select({
    android: CardStyleInterpolators.forFadeFromBottomAndroid,
    ios: CardStyleInterpolators.forScaleFromCenterAndroid,
  }),
};

const Stack = createStackNavigator();

const AuthNavigator = props => {
  return (
    <>
      <Stack.Screen
        name={RouteName.StartUp}
        options={screenOptions}
        component={Startup}
      />
      <Stack.Screen
        name={RouteName.StartScreen}
        options={screenOptions}
        component={StartScreen}
      />
      <Stack.Screen
        name={RouteName.Login}
        options={screenOptions}
        component={Login}
      />
      <Stack.Screen
        name={RouteName.LoginWithPass}
        options={screenOptions}
        component={LoginWithPass}
      />
      <Stack.Screen
        name={RouteName.SignUp}
        options={screenOptions}
        component={SignUp}
      />
      <Stack.Screen
        name={RouteName.FillProfile}
        options={screenOptions}
        component={FillProfile}
      />
      <Stack.Screen
        name={RouteName.ForgotPass}
        options={screenOptions}
        component={ForgotPass}
      />
      {/* <Stack.Screen
        name={RouteName.Home}
        options={screenOptions}
        component={Home}
      /> */}
    </>
  );
};

export default AuthNavigator;
