import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from './IconComponent';
import { AppFont, AppTheme } from 'src/utils/appConstant';
import TouchableDebounce from './TouchableDebounce';
import TextView from './TextView';
import { usePrevious } from 'src/utils/hookApi';
import IconTick from 'src/assets/icons/login/ic_tick.svg';

const CheckBox = (
  {
    defaultValue = false,
    title = '',
    containerStyle = {},
    onChange,
    onChangeDependencies = [],
    textStyle,
    checkBoxStyle,
    isCheckedStyle,
  },
  _ref,
) => {
  const prevDefaultValue = usePrevious(defaultValue);
  const [isChecked, setIsChecked] = useState(defaultValue);
  const handleSelected = useCallback(() => {
    const newVal = !isChecked;
    setIsChecked(newVal);
    onChange?.(newVal);
  }, [isChecked, ...onChangeDependencies]);

  useImperativeHandle(
    _ref,
    () => ({
      setIsChecked,
      isChecked,
    }),
    [isChecked],
  );

  useEffect(() => {
    if (prevDefaultValue !== defaultValue) {
      setIsChecked(defaultValue);
    }
  }, [prevDefaultValue, defaultValue]);

  return (
    <TouchableDebounce
      style={[styles.container, containerStyle]}
      onPress={handleSelected}
    >
      <View
        style={[
          styles.viewCheckSquare,
          isChecked && [styles.vSelected, isCheckedStyle],
          checkBoxStyle,
        ]}
      >
        {isChecked && (
          // <Icon
          //   onPress={handleSelected}
          //   source={IconTick}
          //   size={AppTheme.gapSize.s12}
          //   color={AppTheme.colors.neutral_70}
          // />
          <IconTick />
        )}
      </View>
      <TextView style={[styles.txt1, textStyle]}>{title}</TextView>
    </TouchableDebounce>
  );
};
export default memo(forwardRef(CheckBox));

const styles = StyleSheet.create({
  txt1: {
    marginLeft: AppTheme.gapSize.s8,
    color: AppTheme.colors.neutral_100,
    fontFamily: AppFont.Montserrat_Medium,
    fontSize: AppTheme.fontSize.s12,
  },
  vSelected: {
    backgroundColor: AppTheme.colors.secondary,
    borderColor: AppTheme.colors.neutral_70,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCheckSquare: {
    width: AppTheme.gapSize.s18,
    height: AppTheme.gapSize.s18,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: AppTheme.colors.neutral_70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
