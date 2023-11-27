import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import TextView from '../../components/TextView';
import Button from '../../components/Button';
import IconStart1 from '../../assets/images/StartScreen/management.png';
import IconStart2 from '../../assets/images/StartScreen/productivity.png';
import IconStart3 from '../../assets/images/StartScreen/success.png';
import { AppTheme } from '../../utils/appConstant';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import { navigate } from '../../navigators/NavigationServices';
import RouteName from '../../navigators/RouteName';

const slides = [
  {
    id: 1,
    title: 'Easy task & work management with goal',
    icon: IconStart1,
  },
  {
    id: 2,
    title: 'Trach your productivity  & gain insights',
    icon: IconStart2,
  },
  {
    id: 3,
    title: 'Boost your productivity now & be successful',
    icon: IconStart3,
  },
];

const renderSlide = slides => {
  const Icon = slides?.icon;
  return (
    <View style={styles.slide} key={slides?.id}>
      <FastImage
        source={Icon}
        resizeMode="contain"
        style={{ height: '40%', width: 300 }}
      />
      <TextView
        fontSize={AppTheme.fontSize.s32}
        style={{ fontWeight: 600, textAlign: 'center', maxWidth: '80%' }}
      >
        {slides?.title}
      </TextView>
    </View>
  );
};

const StartScreen = () => {
  const handleMoveToLoginIn = () => {
    navigate(RouteName.Login);
  };
  return (
    <View style={styles.container}>
      <Swiper
        key={slides?.length}
        autoplay={true}
        showsButtons={false}
        showsPagination={true}
        paginationStyle={styles.pagination}
        onIndexChanged={() => {}}
        dotColor={AppTheme.colors.neutral_20}
        activeDotColor={AppTheme.colors.primary_1}
      >
        {slides.map(slide => renderSlide(slide))}
      </Swiper>
      <View style={styles.footer}>
        <Button
          style={styles.buttonNext}
          onPress={handleMoveToLoginIn}
          text="Next"
          textStyle={styles.buttonTextStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    shadowOffset: { width: 0, height: -3 },
    // backgroundColor: 'blue',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    marginBottom: 30,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  pagination: {
    bottom: 0,
  },
  buttonNext: {
    width: '90%',
    height: 50,
    backgroundColor: '#ff585d',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: 'white',
  },
});

export default memo(StartScreen);
