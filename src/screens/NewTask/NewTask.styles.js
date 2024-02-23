import React from 'react';
import { StyleSheet } from 'react-native';
import { AppTheme } from 'src/utils/appConstant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    backgroundColor: '#fcfcfc',
    position: 'relative',
  },
  formCreateNewTask: {
    marginTop: 10,
  },
  titleTextInput: {
    fontSize: AppTheme.fontSize.s14,
    fontWeight: 600,
    marginBottom: 5,
    color: AppTheme.colors.neutral_80,
  },
  buttonNextWrap: {
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 50,
    left: 20,
  },
  buttonNext: {
    width: '100%',
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
export default styles;
