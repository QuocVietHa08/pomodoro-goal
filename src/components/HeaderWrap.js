import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Icon from 'src/assets/icons';
// import IconsSVG from 'src/assets/icons/IconsSVG';
import { AppFont, AppTheme } from '../utils/appConstant';
import TextView from './TextView';
import { goBack } from '../navigators/NavigationServices';
import FastImage from 'react-native-fast-image';
import IconBack from '../assets/images/login/ic_back.png';
import TouchableDebounce from './TouchableDebounce';

const HeaderWrap = ({
  rightIcons = '',
  rightIconStyle,
  rightTitle = '',
  leftIcon = '',
  leftIconStyle,
  containerStyle,
  isBackMode = false,
  titleBack,
  title,
  onBackPress,
  badge = 0,
}) => {
  const handleRenderBackMode = useCallback(() => {
    return (
      <TouchableDebounce
        style={styles.backButtonStyle}
        onPress={() => goBack()}
      >
        <FastImage
          source={IconBack}
          resizeMode="contain"
          style={{ height: 20, width: 20 }}
        />
        <TextView style={styles.backButtonText}>{titleBack}</TextView>
      </TouchableDebounce>
    );
  }, []);
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {isBackMode ? (
        handleRenderBackMode(titleBack)
      ) : (
        <View style={styles.headerWrapper}>
          <View style={styles.rightComponentWrapper}>
            {rightIcons && (
              <FastImage
                source={rightIcons}
                resizeMode="contain"
                style={[{ height: 50, width: 50 }, rightIconStyle]}
              />
            )}
            <TextView style={styles.rightTitleStyle}>{rightTitle}</TextView>
          </View>
          <View style={styles.rightComponentWrapper}>
            {leftIcon && (
              <FastImage
                source={leftIcon}
                resizeMode="contain"
                style={[{ height: 30, width: 30 }, leftIconStyle]}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default HeaderWrap;

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  containerStyle: {
    width: '100%',
    height: AppTheme.basicHeaderHeight,
    flexDirection: 'row',
  },
  backButtonStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButtonText: {
    fontWeight: 700,
    fontSize: AppTheme.fontSize.s16,
  },
  rightComponentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rightTitleStyle: {
    fontSize: AppTheme.fontSize.s20,
    fontWeight: 700,
  },
});
