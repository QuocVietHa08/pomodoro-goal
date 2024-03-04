import React, { useEffect, useState, useTransition } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import TextView from 'src/components/TextView';
import styles from './Goal.styles';
import HeaderWrap from 'src/components/HeaderWrap';
import LogoImage from 'src/assets/images/logo.png';
import BellImage from 'src/assets/images/bell.png';
import newScope from 'src/assets/images/bottomTab/newScope.png';
import HandIcon from 'src/assets/images/hand.png';
import FastImage from 'react-native-fast-image';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { AppTheme } from 'src/utils/appConstant';
import { tasks } from './mockData';
import Task from 'src/components/Task';
import { navigate } from 'src/navigators/NavigationServices';
import RouteName from 'src/navigators/RouteName';
import TouchableDebounce from 'src/components/TouchableDebounce';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, 500);
    }
  }, [refreshing]);
  const handleNavigateTodayTask = () => {
    navigate(RouteName.TodayTask);
  };

  const handleHeaderRightPress = () => {
    navigate(RouteName.Notification);
  };

  const onRefresh = () => {
    setRefreshing(true);
  };

  return (
    <View style={styles.container}>
      <HeaderWrap
        rightIcons={BellImage}
        rightIconStyle={styles.headerIconRight}
        leftTitle="Goal"
        leftIcon={LogoImage}
        leftIconStyle={styles.headerIconLeft}
        onRightPress={handleHeaderRightPress}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>hello</Text>
      </ScrollView>
    </View>
  );
};

export default Home;
