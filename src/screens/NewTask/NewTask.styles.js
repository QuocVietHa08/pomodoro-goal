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
  formCreateNewTask: {
    marginTop: 10,
  },
  titleTextInput: {
    fontSize: AppTheme.fontSize.s14,
    fontWeight: 600,
    marginBottom: 5,
    color: AppTheme.colors.neutral_80,
  },
});
export default styles;
