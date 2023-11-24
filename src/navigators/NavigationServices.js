/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import {
  createNavigationContainerRef,
  StackActions,
  DrawerActions,
} from '@react-navigation/native';
import * as React from 'react';

const navigationRef = createNavigationContainerRef();
const routeNameRef = React.createRef();

function goBack(number) {
  if (!navigationRef.isReady()) return;
  if (!number) {
    return navigationRef.goBack();
  }
  const popAction = StackActions.pop(number);
  navigationRef.dispatch(popAction);
}

function navigate(name, params) {
  if (navigationRef.isReady()) navigationRef.navigate(name, params);
}

function replace(name, params) {
  if (navigationRef.isReady())
    navigationRef.dispatch(StackActions.replace(name, params));
}

function resetTo(name) {
  if (navigationRef.isReady())
    navigationRef.resetRoot({
      index: 0,
      routes: [{ name }],
    });
}

function getCurrentRoute() {
  return navigationRef?.getCurrentRoute?.()?.name;
}

function toggleDrawer() {
  if (!navigationRef.isReady()) return;
  const actions = DrawerActions.toggleDrawer();
  navigationRef.dispatch(actions);
}

export {
  navigationRef,
  routeNameRef,
  goBack,
  navigate,
  replace,
  resetTo,
  getCurrentRoute,
  toggleDrawer,
};
