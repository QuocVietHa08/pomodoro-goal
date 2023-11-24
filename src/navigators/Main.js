import React from 'react';
import { Example, StartScreen, Login } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import RouteName from './RouteName';
const Stack = createStackNavigator();
// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteName.Home} component={Example} />
      {/* <Stack.Screen name={RouteName.StartScreen} component={StartScreen} /> */}
      <Stack.Screen name={RouteName.Login} component={Login} />
    </Stack.Navigator>
  );
};
export default MainNavigator;
