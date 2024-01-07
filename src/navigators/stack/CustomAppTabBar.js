import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppTheme, Dimens } from 'src/utils/appConstant';
import { TextView } from 'src/components';

const ADD_ICON_SIZE = Dimens.width / 5.5;
const AppTabBar = () => {
  return (
    <View>
      <TextView>hello</TextView>
    </View>
  );
};

export default AppTabBar;

const styles = StyleSheet.create({
  vCenter: {
    width: ADD_ICON_SIZE,
    height: ADD_ICON_SIZE,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  btnCenter: {
    backgroundColor: 'red',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: -((28 * ADD_ICON_SIZE) / 100),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  vDot: {
    width: AppTheme.dotSize,
    height: AppTheme.dotSize,
    borderRadius: AppTheme.dotSize / 2,
    backgroundColor: AppTheme.colors.red,
    position: 'absolute',
    right: -2,
    top: -2,
  },
  img1: {
    position: 'absolute',
    top: -12,
    left: 0,
    width: Dimens.width,
    height: AppTheme.bottomTabHeight + 12,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    bottom: 0,
    width: '100%',
    zIndex: 0,
  },
  tabStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // width: Dimens.width / 5,
  },
});
