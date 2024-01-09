import React, { memo, useCallback, useMemo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { AppTheme } from 'src/utils/appConstant';
import TextView from './TextView';
import TouchableDebounce from './TouchableDebounce';
import FastImage from 'react-native-fast-image';

const ButtonIcon = ({
  icon,
  iconSize,
  iconStyle,
  text = '',
  textStyle,
  iconColor,
  containerStyle,
  onPress,
  loading = false,
  loadingColor = AppTheme.colors.white,
  adjustsFontSizeToFit = false,
  numberOfLines = null,
  type = 'active', // inactive
  disabled = false,
  ...rest
}) => {
  const renderIcon = useCallback(() => {
    if (!!icon && !loading) {
      return <FastImage source={icon} style={[styles.ico1, iconStyle]} />;
    }
    if (loading) {
      return (
        <ActivityIndicator
          color={loadingColor}
          size={'small'}
          style={styles.indicator}
        />
      );
    }
    return null;
  }, [icon, loading, loadingColor, iconStyle, iconSize, iconColor, icon]);

  const { backgroundColor, textColor } = useMemo(() => {
    switch (type) {
      case 'inactive':
        return {
          backgroundColor: AppTheme.colors.neutral_20,
          textColor: AppTheme.colors.neutral_40,
        };
      default:
      case 'active':
        return {
          backgroundColor: AppTheme.colors.primary_1,
          textColor: AppTheme.colors.white,
        };
    }
  }, [type]);

  const borderStyle = useMemo(() => {
    if (type != 'inactive') {
      return {};
    }
    return {
      borderWidth: 1,
      borderColor: AppTheme.colors.primary_1,
    };
  }, [type]);

  return (
    <TouchableDebounce
      disabled={disabled}
      style={[
        styles.containerStyle,
        { backgroundColor },
        disabled && styles.disabledView,
        borderStyle,
        containerStyle,
      ]}
      onPress={onPress}
      {...rest}
    >
      {renderIcon()}
      <TextView
        numberOfLines={numberOfLines}
        adjustsFontSizeToFit={adjustsFontSizeToFit}
        style={[styles.txt1, { color: textColor }, textStyle]}
      >
        {text}
      </TextView>
    </TouchableDebounce>
  );
};

export default memo(ButtonIcon);

const styles = StyleSheet.create({
  disabledView: { opacity: 0.6 },
  ico1: { marginRight: AppTheme.gapSize.s8 },
  indicator: { marginRight: 8 },
  txt1: { fontWeight: '600' },
  containerStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    height: AppTheme.buttonHeight,
    paddingHorizontal: 16,
    borderRadius: AppTheme.gapSize.s12,
    justifyContent: 'center',
  },
});
