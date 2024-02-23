import React from 'react';
import { View } from 'react-native';
import TextView from 'src/components/TextView';
import styles from './CompletedTimer.styles';
import TrophyImage from 'src/assets/images/upgradeApp/trophy.png';
import FastImage from 'react-native-fast-image';
import Button from 'src/components/Button';
import { navigate } from 'src/navigators/NavigationServices';
import RouteName from 'src/navigators/RouteName';

const CompletedTimer = () => {
  const handeBackToHome = () => {
    navigate(RouteName.Home);
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenWrap}>
        <View style={styles.titleWrap}>
          <TextView style={styles.mainTitle}>Congratulation</TextView>
          <TextView style={styles.subTitle}>
            You have completed the task. Keep it up!
          </TextView>
        </View>

        <View style={styles.imageWrapper}>
          <FastImage source={TrophyImage} style={styles.trophyImage} />
        </View>
        <View style={{ width: '100%', paddingBottom: 100 }}>
          <Button
            onPress={handeBackToHome}
            style={styles.buttonNext}
            textStyle={styles.buttonTextStyle}
            text="Back to Home Screen"
          />
        </View>
      </View>
    </View>
  );
};

export default CompletedTimer;
