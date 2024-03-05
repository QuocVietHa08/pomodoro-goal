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

  goalItemWrap: {
    width: '100%',
    padding: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: AppTheme.colors.primary_1,
    color: AppTheme.colors.white,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  modalDetailGoal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
  },
});

export default styles;
