import React from 'react';
import styles from './EditProfile.styles'
import { View } from 'react-native';
import TextView from 'src/components/TextView';
import HeaderWrap from 'src/components/HeaderWrap';

const EditProfile = () => {
  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack="Edit Profile" />
    </View>
  )
}

export default EditProfile