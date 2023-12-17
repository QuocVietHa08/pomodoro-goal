import React from 'react';
import { ScrollView, View } from 'react-native';
import styles from './TodayTask.styles';
import HeaderWrap from 'src/components/HeaderWrap';
import { FlatList } from 'react-native-reanimated/mock';
import { tasks } from '../Home/mockData';
import TaskComp from 'src/components/Task';

const TodayTask = () => {
  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack={'Today Tasks (16)'} />
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskComp {...item} />}
      />
    </View>
  );
};

export default TodayTask;
