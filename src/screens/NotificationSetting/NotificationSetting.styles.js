import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
})

export default styles;