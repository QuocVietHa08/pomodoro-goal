import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import HeaderWrap from 'src/components/HeaderWrap';
import styles from './Notification.styles';
import { notifications } from './mockData';
import NotificationComp from 'src/components/Notification/Notification';

const Notification = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState(notifications);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setData(prev => [...prev, ...notifications]);
        setRefreshing(false);
      }, 1000);
    }
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack="Notification" isShowAvatar={false} />
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data}
        renderItem={({ item }) => <NotificationComp {...item} />}
      />
    </View>
  );
};

export default Notification;
