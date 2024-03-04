import React, { useState } from 'react';
import { Switch, View } from 'react-native';
import styles from './NotificationSetting.styles';
import HeaderWrap from 'src/components/HeaderWrap';
import { AppTheme } from 'src/utils/appConstant';
import TextView from 'src/components/TextView';
import RouteName from 'src/navigators/RouteName';
import { navigate } from 'src/navigators/NavigationServices';

const NOTIFICATIONS_SETTING_CONFIG = [
  {
    label: 'General Notificaion',
  },
  {
    label: 'Sound',
  },
  {
    label: 'Vibrate',
  },
  {
    label: 'App Updates',
  },
  {
    label: 'New Service Available',
  },
  {
    label: 'New Tips Available',
  },
];

const NotificationSetting = () => {
  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack="Notification" isShowAvatar={false} />
      {NOTIFICATIONS_SETTING_CONFIG.map((item, index) => (
        <NotificationSettingItem item={item} key={index} />
      ))}
    </View>
  );
};

const NotificationSettingItem = ({ item }) => {
  const [toggleValue, setToggleValue] = useState(false);

  const handleToggle = () => {
    setToggleValue(!toggleValue);
  };

  const handleRedirectToRingTone = () => {
    navigate(RouteName.ReminderRingTone);
  };

  return (
    <View style={styles.itemWrap}>
      <TextView style={styles.textStyle}>{item.label}</TextView>
      <Switch
        trackColor={{ false: 'blue', true: AppTheme.colors.primary_1 }}
        thumbColor={toggleValue ? 'white' : 'white'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={handleToggle}
        value={toggleValue}
        style={styles.switchWrap}
      />
    </View>
  );
};

export default NotificationSetting;
