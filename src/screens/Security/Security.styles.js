import React from 'react';
import { StyleSheet } from 'react-native';
import { AppTheme } from 'src/utils/appConstant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 15,
    backgroundColor: '#fcfcfc',
  },
  itemWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 25,
    padding: 10,
    marginVertical: 5,
    position: 'relative',
  },
  switchWrap: {
    position: 'absolute',
    right: 0,
  }, 
  iconStyle: {
    width: 25,
    height: 25,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'semibold',
  },
  buttonNext: {
    marginTop: 50,
    width: '100%',
    height: 50,
    backgroundColor: '#feeeee',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
  },
  buttonTextStyle: {
    color: AppTheme.colors.primary_1,
  },
})

export default styles;