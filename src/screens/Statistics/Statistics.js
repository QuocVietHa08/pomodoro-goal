import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, FlatList } from 'react-native';
import styles from './Statistics.styles';
import HeaderWrap from 'src/components/HeaderWrap';
import LogoImage from 'src/assets/images/logo.png';
import BellImage from 'src/assets/images/bell.png';
import { navigate } from 'src/navigators/NavigationServices';
import RouteName from 'src/navigators/RouteName';
import TextView from 'src/components/TextView';
import { AppTheme } from 'src/utils/appConstant';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import { LineChart } from 'react-native-chart-kit';
import TouchableDebounce from 'src/components/TouchableDebounce';
import { tasks } from '../Home/mockData';
import Task from 'src/components/Task';
import { SafeAreaView } from 'react-native-safe-area-context';

const data = [
  {
    label: 'Today',
    value: 'today',
  },
  {
    label: 'This Week',
    value: 'thisWeek',
  },
  {
    label: 'This Month',
    value: 'thisMonth',
  },
  {
    label: 'This Year',
    value: 'thisYear',
  },
  {
    label: 'All Time',
    value: 'allTime',
  },
];

const GRAPH_POINTS = [
  { value: 1, date: new Date('2024-01-21') },
  { value: 2, date: new Date('2024-01-20') },
  { value: 3, date: new Date('2024-01-19') },
];
const Statistics = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(data);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, 500);
    }
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const handleHeaderRightPress = () => {
    navigate(RouteName.Notification);
  };

  const handleNavigateTodayTask = () => {
    navigate(RouteName.TodayTask);
  };

  return (
    <View style={styles.container}>
      <HeaderWrap
        rightIcons={BellImage}
        rightIconStyle={styles.headerIconRight}
        leftTitle="Statistics"
        leftIcon={LogoImage}
        leftIconStyle={styles.headerIconLeft}
        onRightPress={handleHeaderRightPress}
      />

      <View style={styles.statisticsTitleWrap}>
        <TextView
          style={{
            fontSize: AppTheme.fontSize.s20,
          }}
        >
          Your Statistics Graph
        </TextView>
        <DropDownPicker
          showTickIcon={false}
          showArrowIcon={false}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          textStyle={{
            color: AppTheme.colors.primary_1,
            fontWeight: 'bold',
          }}
          labelStyle={{
            color: AppTheme.colors.primary_1,
            fontWeight: 'bold',
          }}
          style={styles.dropdown}
          containerStyle={styles.dropContainerStyle}
        />
      </View>
      <View style={styles.lineGraphWrap}>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 98, 103, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(187,187,187, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={styles.lineGraphStyle}
        />
      </View>
      <View>
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
        <SafeAreaView edges={['left', 'right']}>
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={tasks}
            renderItem={({ item }) => <Task {...item} />}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

export default Statistics;
