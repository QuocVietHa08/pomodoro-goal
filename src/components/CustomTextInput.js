/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { AppFont, AppTheme, hitSlop, scaleSize } from '../utils/appConstant';
import { usePrevious } from '../utils/hookApi';
import TextInput from './TextInput';
import TextView from './TextView';
import Icon from './Icon';
import FastImage from 'react-native-fast-image';
import TouchableDebounce from './TouchableDebounce';

const TextInputWithTitle = (
  {
    title,
    leftIco,
    rightIco,
    rightIcoSize = AppTheme.fontSize.s20,
    placeholder,
    containerStyle,
    inputStyle,
    titleStyle,
    viewInputStyle,
    secureTextEntry = false,
    returnKeyType,
    onRightIconPressIn = null,
    onRightIconPressOut = null,
    errorMessage = '',
    colorIcon,
    editable = true,
    placeholderTextColor,
    defaultValue = '',
    inputMode = 'text',
    multiline = false,
    inputHeight,
    fontTitle = AppFont.Quicksand,
    control,
    fieldName = 'fieldName',
    rules,
    onTextChange, //add listenner ontext change
  },
  _ref,
) => {
  const prevDefaultValue = usePrevious(defaultValue);
  // const [text, setText] = useState(defaultValue);
  const onChangeText = txt => {
    field?.onChange(txt);
    onTextChange?.(txt);
  };
  const { control: localControl } = useForm();
  const { field } = useController({
    control: control ?? localControl,
    defaultValue: '',
    name: fieldName,
    rules: rules ?? {},
  });

  useEffect(() => {
    if (prevDefaultValue !== defaultValue) {
      onChangeText(defaultValue);
    }
  }, [prevDefaultValue, defaultValue]);
  return (
    <View style={containerStyle}>
      <View
        style={[
          styles.container,
          !editable && { backgroundColor: AppTheme.colors.neutral_20 },
          inputHeight ? { height: inputHeight } : styles.heightInput,
        ]}
      >
        <View style={[styles.v1, viewInputStyle]}>
          {!!title && (
            <TextView font={fontTitle} style={[styles.txt1, titleStyle]}>
              {title}
            </TextView>
          )}
          <TextInput
            ref={_ref}
            multiline={multiline}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderIcon={leftIco}
            style={[styles.input1, multiline && styles.textArea, inputStyle]}
            editable={editable}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText}
            inputMode={inputMode}
            value={field.value}
            defaultValue
          />
        </View>
        {/* <Icon
          hitSlop={hitSlop}
          onPressIn={onRightIconPressIn}
          onPressOut={onRightIconPressOut}
          source={rightIco}
          color={colorIcon}
          size={rightIcoSize}
        /> */}
        <TouchableDebounce
          onPressIn={onRightIconPressIn}
          onPressOut={onRightIconPressOut}
        >
          <FastImage
            source={rightIco}
            hitSlop={hitSlop}
            style={{ width: 20, height: 20 }}
          />
        </TouchableDebounce>
      </View>
      {!!errorMessage && (
        <TextView style={styles.txtError}>{errorMessage}</TextView>
      )}
    </View>
  );
};

export default forwardRef(TextInputWithTitle);

const styles = StyleSheet.create({
  heightInput: { height: AppTheme.inputHeight },
  textArea: {
    minHeight: scaleSize(64, 'height'),
    paddingTop: AppTheme.normalPadding / 1.5,
    paddingBottom: AppTheme.normalPadding / 1.5,
    display: 'flex',
    textAlignVertical: 'top',
  },
  txtError: {
    color: AppTheme.colors.error_100,
    fontStyle: 'italic',
    marginTop: AppTheme.gapSize.s4,
    fontSize: AppTheme.fontSize.s12,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: AppTheme.gapSize.s20,
    paddingVertical: AppTheme.gapSize.s4,
    borderRadius: AppTheme.gapSize.s10,
    borderColor: AppTheme.colors.neutral_30,
    borderWidth: 1,
  },
  input1: {
    flex: 1,
    padding: 0,
    fontSize: AppTheme.fontSize.s12,
    color: AppTheme.colors.black,
  },
  v1: {
    flex: 1,
  },
  txt1: {
    color: AppTheme.colors.neutral_100,
    fontSize: AppTheme.fontSize.s10,
    fontWeight: '400',
  },
});
