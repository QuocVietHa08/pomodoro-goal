import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppTheme } from '../utils/appConstant';
import TextView from './TextView';
import { goBack, navigate } from '../navigators/NavigationServices';
import FastImage from 'react-native-fast-image';
import IconBack from '../assets/images/login/ic_back.png';
import TouchableDebounce from './TouchableDebounce';
import AvatarDefault from 'src/assets/images/avatar.png';
import RouteName from 'src/navigators/RouteName';

const HeaderWrap = ({
  rightIcons = '',
  rightIconStyle,
  rightTitle = '',
  leftIcon = '',
  leftIconStyle,
  leftTitle = '',
  containerStyle,
  isBackMode = false,
  isShowAvatar = true,
  titleBack,
  onRightPress = () => {},
}) => {
  const handleRedirectToSettingPage = () => {
    navigate(RouteName.Profile);
  };

  const handleRenderBackMode = useCallback(() => {
    return (
      <View style={styles.headerWrapper}>
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
        <View style={styles.rightComponentWrapper}>
          {isShowAvatar && (
            <TouchableDebounce onPress={handleRedirectToSettingPage}>
              <FastImage
                source={AvatarDefault}
                resizeMode="contain"
                style={[{ height: 30, width: 30 }, rightIconStyle]}
              />
            </TouchableDebounce>
          )}
          {rightIcons && (
            <TouchableDebounce onPress={onRightPress}>
              <FastImage
                source={rightIcons}
                resizeMode="contain"
                style={[
                  { height: 30, width: 30, marginLeft: 10 },
                  rightIconStyle,
                ]}
              />
            </TouchableDebounce>
          )}
        </View>
      </View>
    );
  }, []);

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {isBackMode ? (
        handleRenderBackMode(titleBack)
      ) : (
        <View style={styles.headerWrapper}>
          <View style={styles.rightComponentWrapper}>
            {leftIcon && (
              <FastImage
                source={leftIcon}
                resizeMode="contain"
                style={[{ height: 50, width: 50 }, leftIconStyle]}
              />
            )}
            <TextView style={styles.rightTitleStyle}>{leftTitle}</TextView>
          </View>
          <View style={styles.rightComponentWrapper}>
            {isShowAvatar && (
              <TouchableDebounce onPress={handleRedirectToSettingPage}>
                <FastImage
                  source={AvatarDefault}
                  resizeMode="contain"
                  style={[{ height: 30, width: 30 }, rightIconStyle]}
                />
              </TouchableDebounce>
            )}
            {rightIcons && (
              <TouchableDebounce onPress={onRightPress}>
                <FastImage
                  source={rightIcons}
                  resizeMode="contain"
                  style={[
                    { height: 30, width: 30, marginLeft: 10 },
                    rightIconStyle,
                  ]}
                />
              </TouchableDebounce>
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
