import React from 'react';
import styles from './Task.styles';
import { Text, View } from 'react-native';
import moment from 'moment';
import TextView from 'src/components/TextView';
import { CALENDAR_STYLE_BG } from './constant';
const CalendarEvent = ({ item }) => {
  const handleDurationTime = () => {
    const startTime = moment(item?.time, 'hh:mm AM').format('HH:mm');
    const endTime = moment(startTime, 'HH:mm')
      .add(item?.duration, 'hour')
      .format('HH:mm');

    return [startTime, endTime];
  };
  if (!item) {
    return (
      <View style={[styles.itemCalendarStyle]}>
        {/* <Text style={styles.itemCalendarTitle}>No event this time</Text> */}
      </View>
    );
  }
  return (
    <View
      style={[
        styles.itemCalendarStyle,
        { backgroundColor: CALENDAR_STYLE_BG[item.category] },
      ]}
    >
      <Text style={styles.itemCalendarTitle}>{item?.event}</Text>
      <View
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        {handleDurationTime()?.map((time, index) => (
          <View key={time}>
            <Text style={styles.itemCalendarTimeTextStyle}>{`${
              index === 0 ? `${time}: ` : time
            }`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CalendarEvent;
