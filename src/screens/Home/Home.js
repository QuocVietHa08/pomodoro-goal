import React, { useEffect, useState, useTransition } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import TextView from 'src/components/TextView';
import styles from './Home.styles';
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
        <View style={styles.titleWrapper}>
          <TextView style={styles.homeTitle}>Moring, Edward Ha</TextView>
          <FastImage
            source={HandIcon}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </View>

        <View style={styles.progressWrapper}>
          <AnimatedCircularProgress
            size={80}
            width={10}
            fill={75}
            tintColor="#ff6569"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#eee"
          >
            {fill => <Text style={{ fontWeight: 600 }}>75%</Text>}
          </AnimatedCircularProgress>
          <View>
            <TextView style={styles.processTitle}>
              Wow! Your daily {'\n'} goals is almost done
            </TextView>
            <TextView style={styles.processText}>12 of 16 completed!</TextView>
          </View>
        </View>

        <View style={styles.taskTextWrapper}>
          <TextView
            style={{
              fontWeight: 600,
              fontSize: AppTheme.fontSize.s16,
            }}
          >
            Today Task (16)
          </TextView>
          <TouchableDebounce onPress={handleNavigateTodayTask}>
            <TextView
              style={{
                color: '#ff6569',
                fontWeight: 700,
              }}
            >
              See All
            </TextView>
          </TouchableDebounce>
        </View>
        {tasks.map((item, index) => (
          <Task key={index} {...item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;
