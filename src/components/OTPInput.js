import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useController } from 'react-hook-form';
import {
  InteractionManager,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { AppTheme } from 'src/utils/appConstant';
import TextView from './TextView';
// import Icon from 'src/assets/icons';
// import IconsSVG from 'src/assets/icons/IconsSVG';

const OTPItem = ({
  value,
  index,
  valueLength,
  defaultLength,
  errorMessage,
}) => {
  const focused = useMemo(() => {
    if (
      (!valueLength && !index) || // case chua co DL
      valueLength == index ||
      (valueLength == defaultLength && valueLength - 1 == index)
    ) {
      return true;
    }
    return false;
  }, [valueLength, index]);
  return (
    <View
      style={[
        styles.v1,
        {
          borderWidth: focused ? 2 : 1,
          borderColor: errorMessage
            ? AppTheme.colors.error_40
            : focused
            ? AppTheme.colors.neutral_70
            : AppTheme.colors.neutral_30,
        },
      ]}
    >
      <TextView style={styles.txt1}>{value}</TextView>
    </View>
  );
};

const OTPInput = ({
  defaultLength = 4,
  containerStyle,
  autoFocus,
  control,
  fieldName = '',
  errorMessage = '',
}) => {
  const [values, setValues] = useState('');
  const inputRef = useRef();
  const onFocus = useCallback(() => {
    inputRef?.current.focus?.();
  }, []);

  const { field } = useController({
    control: control,
    defaultValue: '',
    name: fieldName,
  });
  const onChangeText = txt => {
    setValues(txt);
    field?.onChange(txt);
  };

  useEffect(() => {
    if (!!values.length && values.length == defaultLength) {
      Keyboard.dismiss();
    }
  }, [values, defaultLength]);

  useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      if (autoFocus) {
        inputRef?.current.focus?.();
      }
    });
    return () => interaction.cancel();
  }, [autoFocus]);

  return (
    <>
      <Pressable onPress={onFocus} style={[styles.v2, containerStyle]}>
        {[...new Array(defaultLength)].map((o, i) => (
          <OTPItem
            key={i}
            index={i}
            value={values?.substring(i, i + 1)}
            valueLength={values.length}
            defaultLength={defaultLength}
            errorMessage={errorMessage}
          />
        ))}
        <TextInput
          ref={inputRef}
          onChangeText={onChangeText}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          style={styles.input}
        />
      </Pressable>
      {errorMessage ? (
        <TextView
          style={{
            alignItems: 'center',
            textAlign: 'center',
            marginTop: AppTheme.gapSize.s10,
          }}
          fontSize={AppTheme.fontSize.fs12}
          color={AppTheme.colors.error_40}
        >
          {/* <Icon source={IconsSVG.ic_warning} size={AppTheme.fontSize.s16} />{' '} */}
          {errorMessage}
        </TextView>
      ) : null}
    </>
  );
};

export default memo(OTPInput);

const styles = StyleSheet.create({
  v2: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  input: { opacity: 0, width: 0, height: 0, position: 'absolute' },
  txt1: {
    fontSize: AppTheme.fontSize.s20,
    fontWeight: '600',
  },
  v1: {
    width: AppTheme.gapSize.s52,
    height: AppTheme.gapSize.s60,
    borderRadius: AppTheme.gapSize.s10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
