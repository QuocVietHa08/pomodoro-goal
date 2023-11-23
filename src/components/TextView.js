import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { AppFont, AppTheme } from '../utils/appConstant';

const CustomFont = {
  normal: 'Regular',
  bold: 'Bold',
  100: 'Light',
  200: 'Light',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'ExtraBold',
};

const TextView = ({
  children,
  style,
  color = AppTheme.colors.black,
  fontSize = AppTheme.fontSize.defaultFontSize,
  numberOfLines,
  adjustsFontSizeToFit = false,
  fontWeight,
  font = '',
  ...rest
}) => {
  const {
    fontWeight: fontWeightStyle,
    fontStyle,
    fontSize: fontSizeStyle,
  } = StyleSheet.flatten(style || {});
  const fontFamily = `${font}-${
    CustomFont[fontWeightStyle] || CustomFont[fontWeight] || CustomFont[400]
  }${fontStyle === 'italic' ? 'Italic' : ''}`;
  return (
    <Text
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      numberOfLines={numberOfLines}
      style={[
        {
          fontSize,
          color: color,
          lineHeight:
            1.4 *
            (fontSizeStyle || fontSize || AppTheme.fontSize.defaultFontSize),
          // fontFamily,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default TextView;
