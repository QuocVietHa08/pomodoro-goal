import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { AppTheme, ButtonType } from '../utils/appConstant';
import TouchableDebounce from './TouchableDebounce';

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
  type = ButtonType.PRIMARY, // primary, secondary, disabled
  disabled = false,
  ...rest
}) => {
  const { backgroundColor, textColor, borderColor, borderWidth } =
    useMemo(() => {
      switch (type) {
        case ButtonType.DISABLE:
          return {
            backgroundColor: AppTheme.colors.neutral_20,
            textColor: AppTheme.colors.neutral_40,
          };
        case ButtonType.CANCEL:
          return {
            backgroundColor: AppTheme.colors.white,
            textColor: AppTheme.colors.neutral_60,
            borderColor: AppTheme.colors.neutral_60,
            borderWidth: 1,
          };
        case ButtonType.SECONDARY:
          return {
            backgroundColor: AppTheme.colors.white,
            textColor: AppTheme.colors.neutral_60,
          };
        case ButtonType.PREVIOUS:
          return {
            backgroundColor: AppTheme.colors.white,
            textColor: AppTheme.colors.primary_1,
            borderColor: AppTheme.colors.primary_1,
            borderWidth: 1,
          };
        default:
        case ButtonType.PRIMARY:
          return {
            backgroundColor: AppTheme.colors.primary_1,
            textColor: AppTheme.colors.white,
          };
      }
    }, [type]);

  const borderStyle = useMemo(() => {
    if (type === 'secondary') {
      return {
        borderWidth: 1,
        borderColor: AppTheme.colors.neutral_60,
      };
    }
    return {};
  }, [type]);

  const renderLoading = useCallback(() => {
    if (loading) {
      return (
        <View>
          <ActivityIndicator
            color={loadingColor}
            size={'small'}
            style={styles.indicator}
          />
        </View>
      );
    }
    return null;
  }, [loading, loadingColor]);

  return (
    <TouchableDebounce
      disabled={disabled}
      style={[
        styles.containerStyle,
        { backgroundColor, borderColor, borderWidth },
        disabled && styles.disabledView,
        borderStyle,
        containerStyle,
      ]}
      onPress={onPress}
      {...rest}
    >
      <View style={styles.buttonWrap}>
        {renderLoading()}
        <Text
          numberOfLines={numberOfLines}
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          style={[styles.txt1, { color: textColor }, textStyle]}
        >
          {text}
        </Text>
      </View>
    </TouchableDebounce>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  disabledView: { opacity: 0.6 },
  ico1: { marginRight: AppTheme.gapSize.s8 },
  indicator: { marginLeft: AppTheme.gapSize.s8 },
  txt1: { fontWeight: '600', fontSize: AppTheme.fontSize.s16 },
  buttonWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  containerStyle: {
    alignItems: 'center',
    height: AppTheme.buttonHeight,
    paddingHorizontal: AppTheme.gapSize.s20,
    paddingVertical: AppTheme.gapSize.s5,
    borderRadius: AppTheme.gapSize.s10,
    justifyContent: 'center',
  },
});
