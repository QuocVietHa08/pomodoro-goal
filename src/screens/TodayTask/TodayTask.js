import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import styles from './TodayTask.styles';
import HeaderWrap from 'src/components/HeaderWrap';
import { FlatList } from 'react-native-reanimated/mock';
import { tasks } from '../Home/mockData';
import TaskComp from 'src/components/Task';

const TodayTask = () => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, 500);
    }
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack={'Today Tasks (16)'} />
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={tasks}
        renderItem={({ item }) => <TaskComp {...item} />}
      />
    </View>
  );
};

export default TodayTask;
