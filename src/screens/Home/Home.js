import React from 'react';
import { View } from 'react-native';
import TextView from 'src/components/TextView';
import styles from './Home.styles';

const Home = () => {
  return (
    <View style={styles.container}>
      <TextView>hello</TextView>
    </View>
  );
};

export default Home;
