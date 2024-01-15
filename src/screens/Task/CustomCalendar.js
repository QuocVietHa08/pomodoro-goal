import React from 'react';
import { View } from 'react-native';
import TextView from 'src/components/TextView';
import styles from './Task.styles';
import { HOURS } from './constant';
import CalendarEvent from './CalendarEvent';

const CustomCalendar = ({ events }) => {
  return (
    <View style={styles.customeCalendarWrapper}>
      {HOURS.map(hour => {
        const event = events?.find(e => e.time === hour);

        return (
          <View key={hour} style={styles.itemEventWrapper}>
            <TextView>{hour}</TextView>
            <CalendarEvent item={event} />
          </View>
        );
      })}
    </View>
  );
};

export default CustomCalendar;
