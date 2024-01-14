import React from 'react';
import { View } from 'react-native';
import TextView from 'src/components/TextView';
import styles from './Task.styles';
import { HOURS } from './constant';
import CalendarEvent from './CalendarEvent';

const CustomCalendar = ({ events }) => {
  console.log('events --->', events);
  return (
    <View style={styles.customeCalendarWrapper}>
      <TextView>hello</TextView>
      {HOURS.map(hour => {
        const event = events?.find(e => e.time === hour);

        console.log('event --->', event);
        return (
          <View style={styles.itemEventWrapper}>
            <TextView>{hour}</TextView>
            <CalendarEvent item={event} />
          </View>
        );
      })}
    </View>
  );
};

export default CustomCalendar;
