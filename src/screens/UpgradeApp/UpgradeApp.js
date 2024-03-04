import React, { useEffect, useRef } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TextView from 'src/components/TextView';
import styles from './UpgradeApp.styles';
import HeaderWrap from 'src/components/HeaderWrap';
import TrophyImage from 'src/assets/images/upgradeApp/trophy.png';
import FastImage from 'react-native-fast-image';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import CustomFirework from 'src/components/CustomFirework/CustomFirework';
import Star1 from 'src/assets/images/upgradeApp/star_01.png';
import Star2 from 'src/assets/images/upgradeApp/star_02.png';
import Star3 from 'src/assets/images/upgradeApp/star_03.png';
import TouchableDebounce from 'src/components/TouchableDebounce';
import RadioButton from 'src/components/RadioButton';
import { AppTheme } from 'src/utils/appConstant';
import Button from 'src/components/Button';

const { width: WIN_WIDTH, height: WIN_HEIGHT } = Dimensions.get('window');

const OPTIONS_UPGRADE = [
  {
    id: 1,
    title: '1 Month',
    price: '$2.99',
    description: 'Pay once, cancel any time',
  },
  {
    id: 2,
    title: '6 Months',
    price: '$16.99',
    description: 'Pay once, cancel any time',
  },
  {
    id: 3,
    title: '12 Months',
    price: '$13.99',
    description: 'Pay once, cancel any time',
  },
];

const UpgradeApp = () => {
  const width = useSharedValue(150);
  const fireworksRef = useRef(null);
  const [selectUpgradePackage, setSelectUpgradePackage] = React.useState(1);

  let isEnterScreen = true;
  useEffect(() => {
    if (isEnterScreen) {
      setTimeout(() => {
        width.value = withSpring(width.value + 50);
      }, 200);
      isEnterScreen = false;
    }
  }, [isEnterScreen]);

  const handleSelectUpgradePackage = id => {
    setSelectUpgradePackage(id);
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

  const fireworksImageView = () => {
    return (
      <CustomFirework
        ref={fireworksRef}
        positionX={WIN_WIDTH / 2.1}
        positionY={WIN_HEIGHT / 2.9}
        particleSize={50}
        radius={80}
        innerRadius={50}
        radiusNoise={100}
        zIndex={100}
        iteration={2}
        numberOfParticle={10}
        particleSources={[Star2, Star1, Star3]}
        autoStart={true}
        animationDuration={1000}
        onAnimationDone={onAnimationDone}
        angleType={'equal'}
      />
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <HeaderWrap
        isBackMode
        titleBack="Upgrade to Premium"
        isShowAvatar={false}
      />
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

        {fireworksImageView()}
        <Animated.View
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
        </Animated.View>
        <View style={styles.upgradeOptionsWrap}>
          {OPTIONS_UPGRADE.map(item => (
            <TouchableDebounce
              onPress={() => handleSelectUpgradePackage(item.id)}
              style={[
                styles.upgradeOption,
                {
                  borderColor:
                    selectUpgradePackage === item.id
                      ? AppTheme.colors.primary_1
                      : 'white',
                  backgroundColor:
                    selectUpgradePackage === item.id ? '#feeeee' : 'white',
                },
              ]}
            >
              <RadioButton selected={item.id === selectUpgradePackage} />
              <View>
                <TextView style={{ fontSize: 20, fontWeight: 600 }}>
                  {item.title}
                </TextView>
                <TextView>{item.description}</TextView>
              </View>
              <TextView style={{ fontSize: 20, fontWeight: 600 }}>
                {item.price}
              </TextView>
            </TouchableDebounce>
          ))}
        </View>
        <View style={{ width: '100%', paddingBottom: 100 }}>
          <Button
            style={styles.buttonNext}
            textStyle={styles.buttonTextStyle}
            text="Subscribe"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default UpgradeApp;
