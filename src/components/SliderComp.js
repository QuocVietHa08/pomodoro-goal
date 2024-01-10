import React, { useEffect } from 'react';
import Slider from '@react-native-community/slider';
import { StyleSheet, View } from 'react-native';
import TextView from './TextView';
import { AppTheme } from 'src/utils/appConstant';
import { useController, useForm } from 'react-hook-form';

const SliderComp = ({
  title,
  minimumValue,
  maximumValue,
  value,
  control,
  errorMessage = '',
  fieldName = 'fieldName',
  disable = false,
  defaultValue = 0,
  rules,
  step = 1,
  onChange = () => {},
}) => {
  const { control: localControl } = useForm();
  const { field } = useController({
    control: control || localControl,
    defaultValue: `${defaultValue || ''}`,
    name: fieldName,
    rules: rules ?? {},
  });
  const onChangeValue = value => {
    field?.onChange(value);
    onChange(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TextView>{title}</TextView>
        <TextView style={{ color: AppTheme.colors.primary_1, fontSize: 16 }}>
          {value}
        </TextView>
      </View>
      <Slider
        style={{ width: '100%', height: 'auto' }}
        minimumValue={minimumValue}
        value={value || field?.value}
        disabled={disable}
        step={step}
        onValueChange={onChangeValue}
        control={control}
        maximumValue={maximumValue}
        minimumTrackTintColor={AppTheme.colors.primary_1}
        maximumTrackTintColor="#eee"
      />
      {errorMessage && (
        <TextView style={{ color: AppTheme.colors.red }}>
          {errorMessage}
        </TextView>
      )}
    </View>
  );
};

export default SliderComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    height: 'auto',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 25,
    fontWeight: 600,
    fontSize: AppTheme.fontSize.s14,
    color: AppTheme.colors.neutral_80,
  },
});
