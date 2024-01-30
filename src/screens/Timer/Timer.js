import React, { useState } from 'react';
import styles from './Timer.styles';
import TextView from 'src/components/TextView';
import { Text, View } from 'react-native';
import HeaderWrap from 'src/components/HeaderWrap';
import ThreeDotsImage from 'src/assets/images/timer/three-dots.png';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { tasks } from '../Home/mockData';
import Task from 'src/components/Task';

const Timer = () => {
  // const [tasks, setTask] = useState(tasks);
  const [currentSession, setCurrentSession] = useState(2);
  return (
    <View style={styles.container}>
      <HeaderWrap
        isBackMode
        titleBack="Pomodoro Timer"
        leftIcon={ThreeDotsImage}
        leftIconStyle={styles.rightIconStyles}
      />
      <View style={styles.timerWrapper}>
        <View style={{ width: '100%' }} />
        <View style={styles.circularWrap}>
          <AnimatedCircularProgress
            size={300}
            width={20}
            fill={55}
            tintColor="#ff6569"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#eee"
          >
            {fill => (
              <View style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ fontWeight: 600, fontSize: 50 }}>18:30</Text>
                <Text style={{ fontSize: 16 }}>2 of 4 sessions</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>
      <View />
    </View>
  );
};

export default Timer;
