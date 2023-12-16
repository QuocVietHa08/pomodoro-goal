import React from 'react';
import { View } from 'react-native';
import TextView from 'src/components/TextView';
import styles from './Task.styles';

const Home = () => {
  return (
    <View style={styles.container}>
      <TextView>Task</TextView>
    </View>
  );
};

export default Home;
