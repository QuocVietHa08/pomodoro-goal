import React from 'react';
import { View } from 'react-native';
import TextView from 'src/components/TextView';
import styles from './FillProfile.styles';
import ProfileAvatar from './ProfileAvatar';
import ProfileForm from './ProfileForm';

const FillProfile = () => {
  const handleEditAvatar = () => {
    console.log('hello');
  };

  return (
    <View style={styles.container}>
      <TextView style={styles.titleHeader}>Fill you profile</TextView>
      <TextView style={styles.subTitle}>
        Don't worry, you can always change it later, or {'\n'} you can skip it
        for now
      </TextView>
      <ProfileAvatar onEditAvatar={handleEditAvatar} />
      <ProfileForm />
    </View>
  );
};

export default FillProfile;
