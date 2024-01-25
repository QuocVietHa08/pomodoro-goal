import React from 'react';
import { View } from 'react-native';
import HeaderWrap from 'src/components/HeaderWrap';
import TextView from 'src/components/TextView';
import styles from './AppSetting.styles';

const AppSetting = () => {
  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack="Goal Setting" />
    </View>
  )
}

export default AppSetting;