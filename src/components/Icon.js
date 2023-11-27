import React from 'react';
import { TouchableDebounce } from './TouchableDebounce';
import { AppTheme } from '../utils/appConstant';

const Icon = ({
  width,
  height,
  color = AppTheme.colors.black, // update 'fill' field in svg file to 'currentColor' to get effect
  style,
  source,
  size = AppTheme.iconSize.s24,
  onPress,
  disabled,
  hitSlop,
  activeOpacity,
  children,
  noTouchDebounce = false,
  onPressIn = null,
  onPressOut = null,
}) => {
  if (!source) {
    return null;
  }
  const IconView = source;
  return (
    <TouchableDebounce
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      noDebounce={noTouchDebounce}
      activeOpacity={activeOpacity}
      hitSlop={hitSlop}
      disabled={(!onPress && !onPressIn && onPressOut) || disabled}
      onPress={onPress}
      style={style}
    >
      <IconView
        width={width || size}
        height={height || size}
        style={{ color }}
      />
      {children}
    </TouchableDebounce>
  );
};
export default Icon;
