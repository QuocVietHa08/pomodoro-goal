import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import RouteName from '../RouteName';
import { Home, Statistics, Task, Profile } from 'src/screens';
import { screenOptions } from '../constants';
import CustomAppTabBar from './CustomAppTabBar';

const Tab = createBottomTabNavigator();

const AppBottomTab = () => {
  const tabBottomRoutes = [
    {
      name: RouteName.Home,
      component: Home,
      title: 'Home',
    },
    {
      name: RouteName.Task,
      component: Task,
      title: 'Task',
    },
    {
      name: RouteName.Statistics,
      component: Statistics,
      title: 'Statistics',
    },
    {
      name: RouteName.Profile,
      component: Profile,
      title: 'Profile',
    },
    // {
    //   name: RouteName.NewScope,
    //   component: Profile,
    //   title: 'd',
    // },
  ];

  const renderTab = item => {
    let option = {
      title: item.title,
      tabBarHideOnKeyboard: true,
    };

    return (
      <Tab.Screen
        key={item.name}
        name={item.name}
        component={item.component}
        options={Object.assign(option, item?.option ? { ...item?.option } : {})}
      />
    );
  };
  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={{
        ...screenOptions,
        tabBarStyle: {
          position: 'absolute',
          overflow: 'visible',
        },
      }}
      // tabBar={props => <CustomAppTabBar {.w..props} />}
    >
      {/* <Tab.Screen name={RouteName.Home} component={Home} />
      <Tab.Screen name={RouteName.Task} component={Task} />
      <Tab.Screen name={RouteName.Statistics} component={Statistics} />
      <Tab.Screen name={RouteName.Profile} component={Profile} /> */}
      {tabBottomRoutes.map(item => renderTab(item))}
    </Tab.Navigator>
  );
};

export default AppBottomTab;
