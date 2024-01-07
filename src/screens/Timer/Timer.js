import React from 'react';
import styles from './Timer.styles';
import TextView from 'src/components/TextView';
import { View } from 'react-native';
import HeaderWrap from 'src/components/HeaderWrap';
import ThreeDotsImage from 'src/assets/images/timer/three-dots.png';

const Timer = () => {
  return (
    <View style={styles.container}>
      <HeaderWrap
        isBackMode
        titleBack="Pomodoro Timer"
        leftIcon={ThreeDotsImage}
        leftIconStyle={styles.rightIconStyles}
      />
      <View />
    </View>
  );
};

export default Timer;
