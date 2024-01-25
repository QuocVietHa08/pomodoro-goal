import React from 'react';
import styles from './ReminderRingTone.styles';
import { View } from 'react-native';
import HeaderWrap from 'src/components/HeaderWrap';

const ReminderRingTone = () => {
  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack="Reminder RingTone" />
    </View>
  )
}

export default ReminderRingTone