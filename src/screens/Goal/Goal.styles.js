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
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  homeTitle: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: AppTheme.fontSize.s24,
    fontWeight: 600,
  },
  progressWrapper: {
    backgroundColor: 'white',
    padding: 10,
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 20,
  },
  processTitle: {
    fontWeight: 600,
    fontSize: AppTheme.fontSize.s16,
    marginBottom: 10,
  },

  processText: {
    fontSize: AppTheme.fontSize.s12,
  },

  taskTextWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default styles;
