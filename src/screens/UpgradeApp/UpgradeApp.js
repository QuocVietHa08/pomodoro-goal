import React, { useEffect, useRef } from 'react';
import { Button, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import TextView from 'src/components/TextView';
import styles from './UpgradeApp.styles';
import HeaderWrap from 'src/components/HeaderWrap';
import TrophyImage from 'src/assets/images/upgradeApp/trophy.png';
import FastImage from 'react-native-fast-image';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
// import CustomFirework from 'src/components/CustomFirework/CustomFirework';
import Star1 from 'src/assets/images/upgradeApp/star_01.png';
import Star2 from 'src/assets/images/upgradeApp/star_02.png';
import Star3 from 'src/assets/images/upgradeApp/star_03.png';

const { width: WIN_WIDTH, height: WIN_HEIGHT } = Dimensions.get('window');

const UpgradeApp = () => {
  const width = useSharedValue(150);
  const fireworksRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      width.value = withSpring(width.value + 50);
    }, 500);
  });

  const buttonView = () => {
    return (
      <View>
        {/* start button */}
        <TouchableOpacity
          style={styles.simpleButton}
          onPress={() => {
            if (fireworksRef.current != null) {
              fireworksRef.current.start();
            }
          }}
        >
          <Text>start</Text>
        </TouchableOpacity>
        {/* stop button */}
        <TouchableOpacity
          style={styles.simpleButton}
          onPress={() => {
            if (fireworksRef.current != null) {
              fireworksRef.current.stop();
            }
          }}
        >
          <Text>stop</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onAnimationDone = state => {
    switch (state) {
      case 'finished':
        {
          console.log(state);
        }
        break;
      case 'progress':
        {
          console.log(state);
        }
        break;
    }
  };

  // const fireworksImageView = () => {
  //   return (
  //     <CustomFirework
  //       ref={fireworksRef}
  //       positionX={WIN_WIDTH / 2}
  //       positionY={WIN_HEIGHT / 2}
  //       particleSize={50}
  //       radius={100}
  //       innerRadius={50}
  //       radiusNoise={100}
  //       zIndex={100}
  //       iteration={1}
  //       numberOfParticle={10}
  //       particleSources={[Star1, Star2, Star3]}
  //       autoStart={true}
  //       animationDuration={500}
  //       onAnimationDone={onAnimationDone}
  //       angleType={'equal'}
  //     />
  //   );
  // };

  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack="Upgrade to Premium" />
      <View style={styles.screenWrap}>
        <View style={styles.titleWrap}>
          <TextView style={styles.mainTitle}>Be Premium</TextView>
          <TextView style={styles.subTitle}>
            Enjoy full access without ads and restrictions
          </TextView>
        </View>

        <View style={styles.titleWrap}>
          <FastImage source={TrophyImage} style={styles.trophyImage} />
        </View>

        {/* <Animated.View
          style={[
            styles.titleWrap,
            {
              width,
              height: width,
              position: 'relative',
            },
          ]}
        >
          <FastImage source={TrophyImage} style={styles.trophyImage} />
        </Animated.View> */}

        {fireworksImageView()}
        {buttonView()}
      </View>
    </View>
  );
};

export default UpgradeApp;
