import React, { useEffect, useState } from 'react';
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
import { AppTheme } from 'src/utils/appConstant';
import { ScrollView } from 'react-native-gesture-handler';
import EmptyTaskImage from 'src/assets/images/task/emptyTask.png';
import CustomCalendar from './CustomCalendar';

const DAY_IN_WEEK = [
  {
    title: 'M',
    value: '10',
  },
  {
    title: 'T',
    value: '11',
  },
  {
    title: 'W',
    value: '12',
  },
  {
    title: 'T',
    value: '13',
  },
  {
    title: 'F',
    value: '14',
  },
  {
    title: 'S',
    value: '15',
  },
  {
    title: 'S',
    value: '16',
  },
];

const mockData = [];

const Home = () => {
  const [tasks, setTasks] = useState([
    {
      time: '07:00 AM',
      event: 'Learn UI Design',
      category: 'study',
      duration: 1,
    },
  ]);
  const [dayInWeeks, setDayInWeeks] = useState(DAY_IN_WEEK);
  const [day, setDay] = useState(moment(new Date()).format('DD/MM/YYYY'));

  const handleSearchTask = () => {
    console.log('handle search task');
  };

  const handleSwitchDay = day => {
    switch (day) {
      case 'Monday':
        return 'M';
      case 'Tuesday':
        return 'T';
      case 'Wednesday':
        return 'W';
      case 'Thursday':
        return 'T';
      case 'Friday':
        return 'F';
      case 'Saturday':
        return 'S';
      case 'Sunday':
        return 'S';
      default:
        return '';
    }
  };
  const getWeekDays = date => {
    let startOfWeek = moment(date, 'DD/MM/YYYY').startOf('week').add(1, 'day');
    let endOfWeek = moment(date, 'DD/MM/YYYY').endOf('week').add(1, 'day');
    let days = [];
    let dayStartOfWeek = startOfWeek;

    console.log('start of week:', startOfWeek);
    console.log(
      'start fo week fix:',
      moment(date, 'DD/MM/YYYY').startOf('week'),
    );
    console.log('end or week:', endOfWeek);

    while (dayStartOfWeek <= endOfWeek) {
      const addDay = {
        title: handleSwitchDay(
          moment(dayStartOfWeek, 'DD/MM/YYYY').format('dddd'),
        ),
        value: moment(dayStartOfWeek, 'DD/MM/YYYY').format('DD'),
        day: moment(dayStartOfWeek, 'DD/MM/YYYY').format('DD/MM/YYYY'),
      };

      days.push(addDay);
      dayStartOfWeek = moment(dayStartOfWeek, 'DD/MM/YYYY').add(1, 'd');
    }

    return days;
  };

  useEffect(() => {
    const weekDays = getWeekDays(day);
    setDayInWeeks(weekDays);
  }, []);

  const handlePrevious = () => {
    const minusDay = moment(day, 'DD/MM/YYYY')
      .subtract(7, 'days')
      .format('DD/MM/YYYY');
    setDay(minusDay);
    const weekDays = getWeekDays(minusDay, 'previous');
    setDayInWeeks(weekDays);
  };

  const handleNext = () => {
    const addDay = moment(day, 'DD/MM/YYYY')
      .add(7, 'days')
      .format('DD/MM/YYYY');
    setDay(addDay);
    const weekDays = getWeekDays(addDay);
    setDayInWeeks(weekDays);
  };

  const handlePressDay = item => {
    setDay(item.day);
  };

  const handleGetWeekBaseOnDay = () => {
    // const weekDays = getWeekDays(day);
    // console.log('w')
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
        <TextView style={{ fontWeight: 600, fontSize: 20 }}>{day}</TextView>
        <TouchableDebounce onPress={handleNext}>
          <FastImage source={NextImage} style={styles.iconCalendar} />
        </TouchableDebounce>
      </View>

      <View>
        <FlatList
          horizontal
          data={dayInWeeks}
          renderItem={({ item }) => (
            <ItemDay
              key={item.day}
              choosingDay={day}
              onPressDay={() => handlePressDay(item)}
              item={item}
            />
          )}
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
        {tasks?.length === 0 ? (
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
        ) : (
          <CustomCalendar events={tasks} />
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const ItemDay = ({ item, onPressDay, choosingDay }) => {
  return (
    <TouchableDebounce onPress={onPressDay}>
      <View
        style={[
          styles.itemDayStyle,
          {
            backgroundColor:
              item.day === choosingDay ? AppTheme.colors.primary_1 : '#f5f5f5',
          },
        ]}
      >
        <TextView
          style={{
            color: item.day === choosingDay ? 'white' : '#616161',
            fontWeight: 700,
          }}
        >
          {item.title}
        </TextView>
        <TextView
          style={{
            color: item.day === choosingDay ? 'white' : '#616161',
            fontWeight: 700,
          }}
        >
          {item.value}
        </TextView>
      </View>
    </TouchableDebounce>
  );
};
