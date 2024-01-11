import React from 'react';
import { View, Image } from 'react-native';
import { useTheme } from '../../hooks';
import logo from '../../assets/images/logo.png';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
const Brand = ({ height, width, mode }) => {
  return (
    <View
      testID={'brand-img-wrapper'}
      style={[styles.brandWrapper, { height, width }]}
    >
      <FastImage source={logo} style={{ height, width }} />
      {/* <Image testID={'brand-img'} source={logo} resizeMode={mode} /> */}
    </View>
  );
};
Brand.defaultProps = {
  height: 200,
  width: 200,
  mode: 'contain',
};

const styles = StyleSheet.create({
  brandWrapper: {
    backgroundColor: 'white',
    width: 300,
    height: 300,
    borderRadius: 50,
  },
});
export default Brand;
