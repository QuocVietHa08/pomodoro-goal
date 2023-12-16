import React from 'react';
import { View, Text } from 'react-native';
import TextView from 'src/components/TextView';
import styles from './Home.styles';
import HeaderWrap from 'src/components/HeaderWrap';
import LogoImage from 'src/assets/images/logo.png';
import BellImage from 'src/assets/images/bell.png';
import HandIcon from 'src/assets/images/hand.png';
import FastImage from 'react-native-fast-image';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Home = () => {
  return (
    <View style={styles.container}>
      <HeaderWrap
        rightIcons={LogoImage}
        rightIconStyle={styles.headerIconLeft}
        rightTitle="Goal"
        leftIcon={BellImage}
        leftIconStyle={styles.headerIconRight}
      />
      <View style={styles.titleWrapper}>
        <TextView style={styles.homeTitle}>Moring, Edward Ha</TextView>
        <FastImage
          source={HandIcon}
          style={{
            width: 30,
            height: 30,
          }}
        />
      </View>

      <View style={styles.progressWrapper}>
        <AnimatedCircularProgress
          size={80}
          width={10}
          fill={75}
          tintColor="#ff6569"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#eee"
        >
          {fill => <Text style={{ fontWeight: 600 }}>75%</Text>}
        </AnimatedCircularProgress>
        <View>
          <TextView style={styles.processTitle}>
            Wow! Your daily {'\n'} goals is almost done
          </TextView>
          <TextView style={styles.processText}>12 of 16 completed!</TextView>
        </View>
      </View>
    </View>
  );
};

export default Home;
