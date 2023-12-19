import { CardStyleInterpolators } from '@react-navigation/stack';
import { Platform } from 'react-native';

const screenOptions = {
  headerShown: false,
  cardStyleInterpolator: Platform.select({
    android: CardStyleInterpolators.forFadeFromBottomAndroid,
    ios: CardStyleInterpolators.forScaleFromCenterAndroid,
  }),
  tabBarHideOnKeyboard: true,
  adaptive: true,
  keyboardHidesTabBar: true,
};

const BOTTOM_TAB_TITLE = {
  Home: 'Home',
  Task: 'Task',
  Statistics: 'Statistics',
  Profile: 'Profile',
};

export { screenOptions, BOTTOM_TAB_TITLE };
