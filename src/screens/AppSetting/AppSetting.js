import React, { useState } from 'react';
import { Switch, View } from 'react-native';
import HeaderWrap from 'src/components/HeaderWrap';
import TextView from 'src/components/TextView';
import styles from './AppSetting.styles';
import TouchableDebounce from 'src/components/TouchableDebounce';
import RouteName from 'src/navigators/RouteName';
import { AppTheme } from 'src/utils/appConstant';
import { navigate } from 'src/navigators/NavigationServices';

const APP_SETTING_CONFIG = [
  {
    label: 'Do Not Disturb',
  },
  {
    label: 'Reminder',
  },
  {
    label: 'Reminder Ringtone',
    screen: RouteName.ReminderTone,
  },
];

const AppSetting = () => {
  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack="Goal Setting" isShowAvatar={false} />
      {APP_SETTING_CONFIG.map((item, index) => (
        <AppSettingItem item={item} key={index} />
      ))}
    </View>
  );
};

export default AppSetting;

const AppSettingItem = ({ item }) => {
  const [toggleValue, setToggleValue] = useState(false);

  const handleToggle = () => {
    setToggleValue(!toggleValue);
  };

  const handleRedirectToRingTone = () => {
    console.log('hello');
    navigate(RouteName.ReminderRingTone);
  };

  return (
    <View style={styles.itemWrap}>
      <TextView style={styles.textStyle}>{item.label}</TextView>
      {item.label !== 'Reminder Ringtone' ? (
        <Switch
          trackColor={{ false: 'blue', true: AppTheme.colors.primary_1 }}
          thumbColor={toggleValue ? 'white' : 'white'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleToggle}
          value={toggleValue}
          style={styles.switchWrap}
        />
      ) : (
        <TouchableDebounce
          style={styles.switchWrap}
          onPress={handleRedirectToRingTone}
        >
          <TextView style={{ color: AppTheme.colors.primary_1, fontSize: 18 }}>
            Checking
          </TextView>
        </TouchableDebounce>
      )}
    </View>
  );
};
