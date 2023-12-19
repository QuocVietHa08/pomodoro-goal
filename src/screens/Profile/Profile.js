import React from 'react';
import styles from './Profile.styles';
import { View } from 'react-native';
import TextView from 'src/components/TextView';

const Profile = () => {
  return (
    <View style={styles.container}>
      <TextView>Profiel hllo</TextView>
    </View>
  );
};

export default Profile;
