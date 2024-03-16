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
import { LineChart } from 'react-native-chart-kit';
import TouchableDebounce from 'src/components/TouchableDebounce';
import { tasks } from './mockData';
import Task from 'src/components/Task';
import {
  CURRENT_DAY_DATA,
  THIS_WEEK_DATA,
  THIS_MONTH_DATA,
  THIS_YEAR_DATA,
} from './mockData';
import { ScrollView } from 'react-native-reanimated/mock';

const data = [
  {
    label: 'Today',
    value: 'today',
  },
  {
    label: 'This Week',
    value: 'week',
  },
  {
    label: 'This Month',
    value: 'month',
  },
  {
    label: 'This Year',
    value: 'year',
  },
];

const DEFAUTL_STATISTICS_DATA = {
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
};
const Statistics = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(data);
  const [statisticsData, setStatisticsData] = useState(DEFAUTL_STATISTICS_DATA);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, 500);
    }
  }, [refreshing]);

  const handleSetStatisticData = valueDropdown => {
    console.log('value drop down:', valueDropdown);
    switch (valueDropdown) {
      case 'today':
        setStatisticsData(CURRENT_DAY_DATA);
        break;
      case 'week':
        setStatisticsData(THIS_WEEK_DATA);
        break;
      case 'month':
        setStatisticsData(THIS_MONTH_DATA);
        break;
      case 'year':
        setStatisticsData(THIS_YEAR_DATA);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (value) {
      handleSetStatisticData(value);
    }
  }, [value]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const handleHeaderRightPress = () => {
    navigate(RouteName.Notification);
  };

  const handleNavigateAllCompletedTask = () => {
    navigate(RouteName.AllCompletedTask);
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
      <ScrollView>
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
            data={statisticsData}
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
              Today, January 21
            </TextView>
            <TouchableDebounce onPress={handleNavigateAllCompletedTask}>
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
          <View>
            {tasks.map((item, index) => (
              <Task key={index} {...item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Statistics;
