import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import TextView from './TextView';
// import Icon from 'src/assets/icons';
// import IconsSVG from 'src/assets/icons/IconsSVG';
import { AppTheme, scaleSize } from 'src/utils/appConstant';
import DropDownPicker from 'react-native-dropdown-picker';
import { useController, useForm } from 'react-hook-form';
import { usePrevious } from 'src/utils/hookApi';
import { isEqual } from 'lodash';
// import FastImage from 'react-native-fast-image';

const DropdownComp = (
  {
    containerStyle,
    title,
    onSelectedItem,
    titleStyle,
    data = [],
    onClose,
    onOpen,
    defaultValue,
    dropDownDirection = 'BOTTOM',
    placeholder = 'Select',
    errorMessage = '',
    control,
    rules,
    fieldName = 'fieldName',
    disable = false,
    value,
  },
  _ref,
) => {
  const [open, setOpen] = useState(false);
  const prevDefaultValue = usePrevious(defaultValue);
  const { control: localControl } = useForm(); // local control
  const { field } = useController({
    control: control || localControl,
    defaultValue: `${defaultValue || ''}`,
    name: fieldName,
    rules: rules ?? {},
  });
  const dropBackgroundColor = useMemo(() => {
    return open ? AppTheme.colors.primary_1 : 'transparent';
  }, [open, disable]);
  const placeholderColor = useMemo(() => {
    return open ? 'white' : AppTheme.colors.neutral_40;
  }, [open]);

  const renderRightIcon = useCallback(
    () => (
      <TextView>hello</TextView>
      // <Icon
      //   color={open ? 'white' : AppTheme.colors.textBlack}
      //   source={open ? IconsSVG.ic_dropdown_white : IconsSVG.ic_chevron_down}
      //   size={12}
      //   style={open}
      // />
    ),
    [open],
  );

  const setValueLocal = val => {
    const index = data.findIndex(o => o?.value == val);
    if (index < 0) {
      return;
    }
    field?.onChange(val);
    onSelectedItem?.(val, index);
  };

  const onSelectItemLocal = selected => {
    const index = data.findIndex(o => o?.value == selected?.value);
    if (index < 0) {
      return;
    }
    field?.onChange(`${selected?.value}`);
    onSelectedItem?.(`${selected?.value}`, index);
  };
  useEffect(() => {
    if (!isEqual(prevDefaultValue, defaultValue)) {
      const index = data.findIndex(o => `${o?.value}` == defaultValue);
      if (index < 0) {
        return;
      }
      field?.onChange(defaultValue);
      onSelectedItem?.(`${defaultValue}`, index);
    }
  }, [prevDefaultValue, defaultValue]);

  useImperativeHandle(
    _ref,
    () => ({
      setValue: setValueLocal,
      setOpen,
    }),
    [data],
  );

  return (
    <View
      pointerEvents={disable ? 'none' : 'auto'}
      style={[styles.container, containerStyle]}
    >
      <DropDownPicker
        dropDownDirection={dropDownDirection}
        open={open}
        value={value || field?.value}
        setValue={field?.onChange}
        items={data}
        setOpen={setOpen}
        onSelectItem={onSelectItemLocal}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        style={{
          ...styles.dropdown,
          backgroundColor: dropBackgroundColor,
          paddingTop: AppTheme.gapSize.s14,
          paddingHorizontal: AppTheme.gapSize.s20,
          height: AppTheme.inputHeight,
          borderRadius: AppTheme.gapSize.s10,
          borderColor: AppTheme.colors.neutral_30,
          borderWidth: 1,
        }}
        placeholderStyle={{
          ...styles.selectedTextStyle,
          color: placeholderColor,
        }}
        ArrowDownIconComponent={renderRightIcon}
        ArrowUpIconComponent={renderRightIcon}
        labelStyle={{
          color: open ? 'white' : AppTheme.colors.neutral_100,
          fontSize: AppTheme.fontSize.s10,
        }}
        containerStyle={{
          ...styles.dropContainerStyle,
          ...{
            borderWidth: errorMessage ? 1 : 0,
            borderColor: errorMessage
              ? AppTheme.colors.error_100
              : 'transparent',
            borderRadius: AppTheme.gapSize.s10,
          },
        }}
        selectedItemLabelStyle={styles.selectedItemLabelStyle}
        showTickIcon={false}
        autoScroll={true}
        onClose={onClose}
        onOpen={onOpen}
        listMode="SCROLLVIEW"
        itemSeparator
        itemSeparatorStyle={styles.itemSeparatorStyle}
        closeOnBackPressed
        listItemLabelStyle={styles.txtItemList}
        placeholder={placeholder}
        scrollViewProps={{
          nestedScrollEnabled: true,
          onMomentumScrollEnd(event) {},
        }}
      />
      {!!title && (
        <TextView style={[styles.txt1, titleStyle]}>{title}</TextView>
      )}
      {!!errorMessage && (
        <TextView style={styles.txtError}>{errorMessage}</TextView>
      )}
    </View>
  );
};

export default memo(forwardRef(DropdownComp));

const styles = StyleSheet.create({
  container: {},
  txtError: {
    marginTop: 5,
    color: AppTheme.colors.error_100,
    fontStyle: 'italic',
    fontWeight: '500',
    zIndex: 1,
  },
  selectedItemLabelStyle: {
    color: AppTheme.colors.black,
    fontWeight: '600',
  },
  txtItemList: {
    fontSize: AppTheme.fontSize.defaultFontSize,
    color: AppTheme.colors.neutral_80,
  },
  dropDownContainerStyle: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: AppTheme.colors.neutral_60,
    marginTop: 6,
    borderRadius: 8,
    zIndex: 9999,
    position: 'relative', // to fix scroll issue ... it is by default 'absolute'
    top: 0, //to fix gap between label box and container
    paddingLeft: AppTheme.gapSize.s10,
  },
  dropContainerStyle: {},
  txtTitle: { marginBottom: 10 },
  dropdown: {
    minHeight: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 0,
  },
  selectedTextStyle: {
    fontSize: AppTheme.fontSize.s12,
    color: AppTheme.colors.black,
  },
  itemSeparatorStyle: {
    backgroundColor: AppTheme.colors.textBlack,
    height: 1,
    opacity: 0.1,
  },
  txt1: {
    color: AppTheme.colors.textBlack,
    position: 'absolute',
    fontSize: AppTheme.fontSize.s10,
    fontWeight: '400',
    left: AppTheme.gapSize.s20,
    top: AppTheme.gapSize.s5,
    zIndex: 10,
  },
  icon_chevron: {
    position: 'absolute',
    right: AppTheme.gapSize.s20,
    top: AppTheme.gapSize.s20,
  },
});
