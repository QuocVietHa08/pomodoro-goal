import React from 'react';
import { View } from 'react-native';
import { AppTheme } from 'src/utils/appConstant';

const RadioButton = props => {
  return (
    <View
      style={[
        {
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: AppTheme.colors.primary_1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.style,
      ]}
    >
      {props.selected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: AppTheme.colors.primary_1,
          }}
        />
      ) : null}
    </View>
  );
};

export default RadioButton;
