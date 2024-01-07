import React, { useCallback, useRef } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { AppTheme } from '../utils/appConstant';
import { delay } from '../utils/fun';

const TouchableDebounce = (
  props = {
    timeout: Number,
    children: null,
    onPress: null,
    noDebounce: Boolean,
    hitSlop: {
      top: Number,
      left: Number,
      bottom: Number,
      right: Number,
    },
    loading: Boolean,
    loadingColor: String,
    activeOpacity: Number,
    disabled: Boolean,
    style: {},
    onPressIn: Function,
    onPressOut: Function,
  },
) => {
  const debounceRef = useRef();
  const {
    timeout = 500,
    children,
    onPress,
    noDebounce = false,
    loading,
    loadingColor = AppTheme.colors.white,
    disabled,
    activeOpacity = 0.8,
  } = props;
  const onLocalPress = useCallback(async () => {
    try {
      if (!onPress) {
        return;
      }
      if (noDebounce) {
        onPress();
      } else {
        if (debounceRef.current) {
          return;
        }
        onPress();
        debounceRef.current = delay;
        await debounceRef.current(timeout);
        debounceRef.current = null;
      }
    } catch (error) {
      console.log(error);
    }
  }, [noDebounce, onPress, timeout]);
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={activeOpacity}
      onPress={onLocalPress}
      disabled={disabled || loading}
    >
      {loading ? <ActivityIndicator color={loadingColor} /> : children}
    </TouchableOpacity>
  );
};

export default TouchableDebounce;
