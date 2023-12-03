import React from 'react';
import { StyleSheet } from 'react-native';
import { AppTheme } from 'src/utils/appConstant';

const styles = StyleSheet.create({
  headerWrapper: {
    position: 'absolute',
    top: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    backgroundColor: AppTheme.colors.white,
  },
  containerScrollView: {
    width: '90%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  screenContent: {
    marginTop: 70,
  },
  optionResetPassWrapper: {
    marginTop: 20,
    gap: 20,
  },
  optionResetWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppTheme.colors.neutral_40,
    padding: 20,
    borderRadius: 20,
  },
  optionResetImage: {
    backgroundColor: AppTheme.colors.neutral_10,
    borderRadius: 50,
    padding: 10,
  },
  buttonNext: {
    marginTop: 50,
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
  enterCodeWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
    padding: 20,
  },
  enterCodeKeyboardScrollView: {
    height: '100%',
  },
});

export default styles;
