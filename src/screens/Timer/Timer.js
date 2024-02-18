import React, { useEffect, useState } from 'react';
import styles from './Timer.styles';
import TextView from 'src/components/TextView';
import { Text, View } from 'react-native';
import HeaderWrap from 'src/components/HeaderWrap';
import ThreeDotsImage from 'src/assets/images/timer/three-dots.png';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { tasks } from '../Home/mockData';
import Task from 'src/components/Task';
import moment from 'moment';
import Button from 'src/components/Button';
import ModalGiveUp from './ModalGiveUp';

const Timer = () => {
  // const [tasks, setTask] = useState(tasks);
  const [currentSession, setCurrentSession] = useState(2);
  const [time, setTime] = useState(20);
  const [currentTime, setCurrentTime] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [openModalGiveUp, setOpenModalGiveUp] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (!isStart) {
        return;
      }
      if (currentTime >= time) {
        return;
      }
      setCurrentTime(prev => prev + 1);
    }, 1000);
  });

  function pad(num) {
    return ('0' + num).slice(-2);
  }

  function hhmmss(secs) {
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  }

  const handleStartTime = () => {
    setIsStart(true);
  };

  const handleGiveUp = () => {
    if (currentTime > 10) {
      setIsStart(false);
    }
    setIsStart(false);
    setOpenModalGiveUp(true);
  };

  const onCloseModalGiveUp = () => {
    setOpenModalGiveUp(false);
    setIsStart(true);
  };

  const onGiveUp = () => {
    console.log('cehcking');
  };

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
            fill={(currentTime / time) * 100}
            tintColor="#ff6569"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#eee"
          >
            {fill => (
              <View style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ fontWeight: 600, fontSize: 50 }}>
                  {hhmmss(currentTime)}
                </Text>
                <Text style={{ fontSize: 16 }}>2 of 4 sessions</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
        <View style={styles.buttonWrapper}>
          {isStart ? (
            <Button
              text={
                currentTime < 10 ? `Give up (${10 - currentTime})` : 'Give up'
              }
              onPress={handleGiveUp}
              textStyle={styles.buttonCancelTextStyle}
              containerStyle={styles.buttonCancelStyle}
            />
          ) : (
            <Button
              containerStyle={styles.buttonStartStyle}
              text={isStart ? 'Pause' : 'Start'}
              onPress={handleStartTime}
            />
          )}
        </View>
      </View>
      <ModalGiveUp
        open={openModalGiveUp}
        handleClose={onCloseModalGiveUp}
        onGiveUp={onGiveUp}
      />
    </View>
  );
};

export default Timer;
