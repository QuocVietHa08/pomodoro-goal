import React from 'react';
import { View } from 'react-native';
import TextView from 'src/components/TextView';
import styles from './Task.styles';
import HeaderWrap from 'src/components/HeaderWrap';
import LogoImage from 'src/assets/images/logo.png';
import SearchImage from 'src/assets/images/search.png';

const Home = () => {
  const handleSearchTask = () => {
    console.log('handle search task');
  };

  return (
    <View style={styles.container}>
      <HeaderWrap
        leftTitle="Promodoro Task"
        leftIcon={LogoImage}
        rightIcons={SearchImage}
        leftIconStyle={styles.headerIconLeft}
        onRightPress={handleSearchTask}
      />

      <TextView>Task</TextView>
    </View>
  );
};

export default Home;
