import React from 'react';
import { FlatList, View } from 'react-native';
import HeaderWrap from 'src/components/HeaderWrap';
import styles from './Notification.styles';
import { notifications } from './mockData';
import NotificationComp from 'src/components/Notification/Notification';

const Notification = () => {
  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack="Notification" />
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationComp {...item} />}
      />
    </View>
  );
};

export default Notification;
