import React, { memo } from 'react';
import TextView from '../TextView';
import { StyleSheet, View } from 'react-native';
import TouchableDebounce from '../TouchableDebounce';
import FastImage from 'react-native-fast-image';
import ReadImg from 'src/assets/images/task/read.png';
import Laptop from 'src/assets/images/task/laptop.png';
import LearningCode from 'src/assets/images/task/learning-code.png';
import Meditation from 'src/assets/images/task/meditation.png';
import Music from 'src/assets/images/task/music.png';
import Dumbbell from 'src/assets/images/task/dumbbel.png';
import Running from 'src/assets/images/task/running.png';
import Working from 'src/assets/images/task/working.png';
import Writing from 'src/assets/images/task/writing.png';

import { AppTheme } from 'src/utils/appConstant';
import { navigate } from 'src/navigators/NavigationServices';
import RouteName from 'src/navigators/RouteName';

const TaskComponent = ({ title, type, workingSession, category }) => {
  const duration = workingSession * 25;
  const handleStartTimer = () => {
    navigate(RouteName.Timer, { title, type, workingSession, category });
  };

  const handleRenderImage = cate => {
    const CATEGORIES = {
      reading: ReadImg,
      listening: Music,
      learning: LearningCode,
      exercice: Dumbbell,
      tech: Laptop,
      meditation: Meditation,
      running: Running,
      working: Working,
      writing: Writing,
    };

    return CATEGORIES[cate];
  };

  return (
    <View style={styles.taskContainer}>
      <View style={styles.taskContainWrapper}>
        <FastImage
          source={handleRenderImage(category)}
          style={{
            width: 50,
            height: 50,
          }}
        />
        <View>
          <TextView style={styles.taskTitle}>{title}</TextView>
          <TextView>{duration} minutes</TextView>
        </View>
      </View>
      <TouchableDebounce onPress={handleStartTimer} style={styles.playButton}>
        <View style={styles.playIcon} />
      </TouchableDebounce>
    </View>
  );
};

export default memo(TaskComponent);

const styles = StyleSheet.create({
  taskContainer: {
    marginVertical: 10,
    backgroundColor: 'white',
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
    borderRadius: 15,
  },
  taskContainWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  taskTitle: {
    color: 'black',
    fontWeight: 600,
    fontSize: AppTheme.fontSize.s14,
  },
  playButton: {
    backgroundColor: '#23c268',
    width: 50,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    borderLeftColor: 'transparent',
    transform: [
      {
        translateX: 3,
      },
      {
        rotate: '90deg',
      },
    ],
  },
});
