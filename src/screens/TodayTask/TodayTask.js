import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from './TodayTask.styles';
import HeaderWrap from 'src/components/HeaderWrap';
import { FlatList } from 'react-native-reanimated/mock';
import TaskComp from 'src/components/Task';
import AppwriteContext from 'src/utils/appwrite/AppwriteContext';
import { useToast } from 'react-native-toast-notifications';
import Config from 'react-native-config';

const TASK_COLLECTION_ID = Config.TASK_COLLECTION_ID;
const DATABASE_ID = Config.DATABASE_ID;

const TodayTask = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { appwrite } = useContext(AppwriteContext);
  const toast = useToast();
  const [tasks, setTasks] = useState([]);

  const handleGetTask = useCallback(() => {
    appwrite
      .getListDocument(DATABASE_ID, TASK_COLLECTION_ID)
      .then(response => {
        setTasks(response?.documents);
      })
      .catch(error => {
        toast.show('Connection error', { type: 'error' });
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    handleGetTask();
  }, [handleGetTask]);

  useEffect(() => {
    if (refreshing) {
      handleGetTask();
    }
  }, [refreshing, handleGetTask]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  return (
    <View style={styles.container}>
      <HeaderWrap
        isBackMode
        isShowAvatar={false}
        titleBack={`Today Tasks (${tasks.length})`}
      />
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={tasks}
        renderItem={({ item }) => <TaskComp item={item} />}
      />
    </View>
  );
};

export default TodayTask;
