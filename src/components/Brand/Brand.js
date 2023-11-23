import React from 'react';
import { View, Image } from 'react-native';
import { useTheme } from '../../hooks';
import logo from '../../assets/images/logo.png';
import { StyleSheet } from 'react-native';
const Brand = ({ height, width, mode }) => {
  const { Layout, Images } = useTheme();
  return (
    <View
      testID={'brand-img-wrapper'}
      style={[styles.brandWrapper, { height, width }]}
    >
      <Image
        testID={'brand-img'}
        style={Layout.fullSize}
        source={logo}
        resizeMode={mode}
      />
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
    width: 200,
    height: 200,
    borderRadius: 50,
  },
});
export default Brand;
