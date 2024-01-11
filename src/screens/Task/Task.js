import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import TextView from 'src/components/TextView';
import styles from './Task.styles';
import HeaderWrap from 'src/components/HeaderWrap';
import LogoImage from 'src/assets/images/logo.png';
import SearchImage from 'src/assets/images/search.png';
import FastImage from 'react-native-fast-image';
import PreviousImage from 'src/assets/images/task/previous.png';
import NextImage from 'src/assets/images/task/next.png';
import TouchableDebounce from 'src/components/TouchableDebounce';
import moment from 'moment';
import { date } from 'yup';
import { AppTheme } from 'src/utils/appConstant';
import { ScrollView } from 'react-native-gesture-handler';
import EmptyTaskImage from 'src/assets/images/task/emptyTask.png';

const DAY_IN_WEEK = [
  {
    day: 'M',
    value: '10',
    active: true,
  },
  {
    day: 'T',
    value: '11',
    active: false,
  },
  {
    day: 'W',
    value: '12',
    active: false,
  },
  {
    day: 'T',
    value: '13',
    active: false,
  },
  {
    day: 'F',
    value: '14',
    active: false,
  },
  {
    day: 'S',
    value: '15',
    active: false,
  },
  {
    day: 'S',
    value: '16',
    active: false,
  },
];

const mockData = [];

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const handleSearchTask = () => {
    console.log('handle search task');
  };

  const handlePrevious = () => {
    console.log('handle previous');
  };

  const handleNext = () => {
    console.log('handle Next');
  };

  return (
    <View style={styles.container}>
      <HeaderWrap
        leftTitle="Promodoro Task"
        leftIcon={LogoImage}
        rightIcons={SearchImage}
        leftIconStyle={styles.headerIconLeft}
        onRightPress={handleSearchTask}
      />
      <View style={styles.calendarStyle}>
        <TouchableDebounce onPress={handlePrevious}>
          <FastImage source={PreviousImage} style={styles.iconCalendar} />
        </TouchableDebounce>
        <TextView style={{ fontWeight: 600, fontSize: 20 }}>
          {moment(new Date()).format('DD/MM/YYYY')}
        </TextView>
        <TouchableDebounce onPress={handleNext}>
          <FastImage source={NextImage} style={styles.iconCalendar} />
        </TouchableDebounce>
      </View>

      <View>
        <FlatList
          horizontal
          data={DAY_IN_WEEK}
          renderItem={({ item }) => <ItemDay item={item} />}
          style={{
            marginTop: 25,
          }}
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        />
      </View>

      <ScrollView
        style={styles.calendarWrapper}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {tasks?.length === 0 && (
          <View style={styles.emptyTask}>
            <FastImage
              source={EmptyTaskImage}
              style={{ width: 250, height: 250 }}
            />
            <TextView
              style={{
                color: AppTheme.colors.primary_1,
                fontWeight: 700,
                fontSize: AppTheme.fontSize.s20,
                marginTop: 30,
                marginBottom: 20,
              }}
            >
              You have no task today!
            </TextView>
            <TextView>Click the (+) icon to add a new task</TextView>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const ItemDay = ({ item }) => {
  return (
    <View
      style={[
        styles.itemDayStyle,
        {
          backgroundColor: item.active ? AppTheme.colors.primary_1 : '#f5f5f5',
        },
      ]}
    >
      <TextView
        style={{ color: item.active ? 'white' : '#616161', fontWeight: 700 }}
      >
        {item.day}
      </TextView>
      <TextView
        style={{ color: item.active ? 'white' : '#616161', fontWeight: 700 }}
      >
        {item.value}
      </TextView>
    </View>
  );
};
