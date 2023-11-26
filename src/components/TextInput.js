import React, { forwardRef } from 'react';
import { TextInput as RNTextInput, View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { AppTheme } from 'src/utils/appConstant';

const TextInput = (
  {
    multiline = false,
    placeholder,
    placeholderIcon,
    style,
    onChangeText,
    value,
    maxLength,
    keyboardType,
    editable = true,
    fontSize = AppTheme.fontSize.defaultFontSize,
    placeholderTextColor = AppTheme.colors.neutral_30,
    secureTextEntry = false,
    returnKeyType,
    inputMode = 'text',
    onFocus,
    ...rest
  },
  _ref,
) => {
  return (
    <View style={styles.searchSection}>
      {placeholderIcon && (
        <FastImage
          source={placeholderIcon}
          style={{ width: 20, height: 20, padding: 10 }}
        />
      )}
      <RNTextInput
        ref={_ref}
        editable={editable}
        keyboardType={keyboardType}
        maxLength={maxLength}
        value={value}
        onChangeText={onChangeText}
        style={[
          { fontSize, paddingLeft: placeholderIcon ? 10 : 0 },
          style,
          styles.input,
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
        inputMode={inputMode}
        multiline={multiline}
        onFocus={onFocus}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    color: '#424242',
  },
});
export default forwardRef(TextInput);
