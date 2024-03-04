import React, { useState } from 'react';
import { View, Text } from 'react-native';
import HeaderWrap from 'src/components/HeaderWrap';
import styles from './Security.styles';
import TextView from 'src/components/TextView';
import { Switch } from 'react-native-gesture-handler';
import { AppTheme } from 'src/utils/appConstant';
import Button from 'src/components/Button';
const SECURITY_SETTING_CONFIG = [
  {
    label: 'Face ID',
  },
  {
    label: 'Remember me',
  },
  {
    label: 'Touch Id',
  },
];

const Security = () => {
  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack="Security" isShowAvatar={false} />
      {SECURITY_SETTING_CONFIG.map((item, index) => (
        <SecuritySettingItem item={item} key={index} />
      ))}
      <Button
        style={[styles.buttonNext, { marginTop: 10 }]}
        textStyle={styles.buttonTextStyle}
        text="Change Password"
      />
    </View>
  );
};

const SecuritySettingItem = ({ item }) => {
  const [toggleValue, setToggleValue] = useState(false);

  const handleToggle = () => {
    setToggleValue(!toggleValue);
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

export default Security;
