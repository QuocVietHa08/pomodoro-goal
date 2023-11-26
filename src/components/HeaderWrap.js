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
  rightIcons = [],
  containerStyle,
  isBackMode = false,
  titleBack,
  title,
  onBackPress,
  badge = 0,
}) => {
  const handleRenderBackMode = useCallback(title => {
    return (
      <TouchableDebounce onPress={() => goBack()}>
        <FastImage
          source={IconBack}
          resizeMode="contain"
          style={{ height: 20, width: 20 }}
        />
        <TextView>{titleBack}</TextView>
      </TouchableDebounce>
    );
  }, []);
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {isBackMode ? (
        handleRenderBackMode(titleBack)
      ) : (
        <View>
          <TextView>hello</TextView>
        </View>
      )}
    </View>
  );
};

export default HeaderWrap;

const styles = StyleSheet.create({
  viewBadge: {
    right: 10,
    top: -2,
    width: 13,
    height: 13,
    borderRadius: 13 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'red',
    padding: 2,
  },
  txtBadge: { fontSize: 8, color: AppTheme.colors.white },
  vIcon: { flexDirection: 'row', alignItems: 'center' },
  txtBack: {
    marginLeft: 8,
    color: AppTheme.colors.primary,
    fontWeight: '500',
    fontSize: AppTheme.fontSize.s12,
  },
  title: {
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  icon: {
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginStart: 25,
  },
  containerStyle: {
    width: '100%',
    height: AppTheme.basicHeaderHeight,
    flexDirection: 'row',
    paddingRight: AppTheme.normalPadding,
  },
});
