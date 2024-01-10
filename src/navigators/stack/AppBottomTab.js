import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import RouteName from '../RouteName';
import { Home, Statistics, Task, Profile, NewTask } from 'src/screens';
import { screenOptions } from '../constants';
import { View } from 'react-native';
import TextView from 'src/components/TextView';
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
      name: RouteName.NewTask,
      component: NewTask,
      title: '',
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
    //   name: RouteName.CreateNewTask,
    //   component: NewTask,
    //   title: '',
    //   options: {
    //     unmountOnBlur: true,
    //   },
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
        options={Object.assign(
          option,
          item?.options ? { ...item?.options } : {},
        )}
        listeners={({ navigation }) => ({
          blur: () => {},
        })}
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
      tabBar={props => <CustomAppTabBar {...props} />}
    >
      {tabBottomRoutes.map(item => renderTab(item))}
    </Tab.Navigator>
  );
};

export default AppBottomTab;
