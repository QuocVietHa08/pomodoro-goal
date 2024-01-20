import React from 'react';
import { StyleSheet } from 'react-native';
import { AppTheme } from 'src/utils/appConstant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    backgroundColor: '#fcfcfc',
  },
  headerIconLeft: {
    width: 60,
    height: 60,
  },
  headerIconRight: {
    width: 30,
    height: 30,
  },
  statisticsTitleWrap: {
    width: '100%',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    width: '100%',
    minHeight: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  dropDownContainerStyle: {
    width: '100%',
    maxHeight: 200,
    borderWidth: 1,
    borderColor: AppTheme.colors.neutral_60,
    marginTop: 6,
    borderRadius: 8,
    zIndex: 9999,
    top: 0, //to fix gap between label box and container
    paddingLeft: AppTheme.gapSize.s10,
  },
  dropContainerStyle: {
    width: '30%',
  },
});

export default styles;
