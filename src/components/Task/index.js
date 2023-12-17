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
import { AppTheme } from 'src/utils/appConstant';

const TaskComponent = ({ title, type, workingSession, category }) => {
  const duration = workingSession * 25;
  const handleStartTimer = () => {};

  const handleRenderImage = cate => {
    const CATEGORIES = {
      read: ReadImg,
      listen: Music,
    };

    return CATEGORIES[cate];
  };

  return (
    <View style={styles.taskContainer}>
      <View style={styles.taskContainWrapper}>
        <FastImage
          source={() => handleRenderImage(category)}
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
      <TouchableDebounce onPress={handleStartTimer}>
        <TextView>Press</TextView>
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
});
