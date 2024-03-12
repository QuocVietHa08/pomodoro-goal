import React, { useCallback, useContext, useEffect, useState } from 'react';
import styles from './Timer.styles';
import TextView from 'src/components/TextView';
import { Text, View } from 'react-native';
import HeaderWrap from 'src/components/HeaderWrap';
import ThreeDotsImage from 'src/assets/images/timer/three-dots.png';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import { tasks } from '../Home/mockData';
// import Task from 'src/components/Task';
import moment from 'moment';
import Button from 'src/components/Button';
import ModalGiveUp from './ModalGiveUp';
import { navigate } from 'src/navigators/NavigationServices';
import RouteName from 'src/navigators/RouteName';
import Config from 'react-native-config';
import AppwriteContext from 'src/utils/appwrite/AppwriteContext';

const TASK_COLLECTION_ID = Config.TASK_COLLECTION_ID;
const DATABASE_ID = Config.DATABASE_ID;
const FORMAT_TIME = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

const Timer = ({ route }) => {
  const { params } = route;
  console.log('params--->', params);
  const { appwrite } = useContext(AppwriteContext);
  const [currentSession, setCurrentSession] = useState(2);
  const [time, setTime] = useState(params?.item?.duration * 60);
  const [currentTime, setCurrentTime] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [openModalGiveUp, setOpenModalGiveUp] = useState(false);
  const startTime = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');

  const handleUpdateTaskStatus = useCallback(() => {
    const dataSumit = {
      title: params?.item?.title,
      duration: params?.item?.duration,
      category_id: params?.item?.category_id,
      start_time: startTime,
      end_time: moment(startTime)
        .add(params?.item?.duration, 'minutes')
        .format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      is_done: true,
    };
    appwrite
      .updateDocument(
        DATABASE_ID,
        TASK_COLLECTION_ID,
        params?.item?.$id,
        dataSumit,
      )
      .then(response => {
        console.log('respoonse---->', response);
        navigate(RouteName.CompletedTimer);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!isStart) {
        return;
      }
      if (currentTime >= time) {
        handleUpdateTaskStatus();
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
    setOpenModalGiveUp(false);
    setIsStart(false);
    navigate(RouteName.Home);
  };

  // const handelCompletedTimer = () => {
  //   navigate(RouteName.CompletedTimer);
  // };

  return (
    <View style={styles.container}>
      {!isStart && (
        <HeaderWrap
          isBackMode
          titleBack="Back to Home Screen"
          isShowAvatar={false}
          leftIcon={ThreeDotsImage}
          leftIconStyle={styles.rightIconStyles}
        />
      )}
      <View style={styles.timerWrapper}>
        <View style={styles.timerCategory}>
          <Text style={{ fontSize: 18 }}>{params?.item?.title}</Text>
        </View>
        <View style={styles.circularWrap}>
          <AnimatedCircularProgress
            size={300}
            width={20}
            fill={(currentTime / time) * 100}
            tintColor="#ff6569"
            backgroundColor="#eee"
            onAnimationComplete={() => console.log('onAnimationComplete')}
          >
            {fill => (
              <View style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ fontWeight: 600, fontSize: 50 }}>
                  {hhmmss(currentTime)}
                </Text>
                {/* <Text style={{ fontSize: 16 }}>2 of 4 sessions</Text> */}
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
