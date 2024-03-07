import React, { useCallback, useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AppTheme } from 'src/utils/appConstant';
import SuccessIcon from 'src/assets/images/toast/success.png';
import WrongIcon from 'src/assets/images/toast/wrong.png';
import FastImage from 'react-native-fast-image';

const CustomToast = ({ toast }) => {
  const { message, type } = toast;

  const borderStyle = useMemo(() => {
    if (type === 'success') {
      return {
        borderColor: '#C8E6C9',
        borderWidth: 1,
      };
    }
    if (type === 'error') {
      return {
        borderColor: AppTheme.colors.primary_1,
        borderWidth: 1,
      };
    }
    return {};
  }, [type]);

  const MesgColor = useMemo(() => {
    if (type === 'success') {
      return {
        color: '#4cae51',
      };
    }
    if (type === 'error') {
      return {
        color: AppTheme.colors.primary_1,
      };
    }
    return {};
  }, [type]);

  const ToastIcon = useCallback(() => {
    if (type === 'success') {
      return (
        <View>
          <FastImage source={SuccessIcon} style={styles.toastIcon} />
        </View>
      );
    }

    if (type === 'error') {
      return (
        <View>
          <FastImage source={WrongIcon} style={styles.toastIcon} />
        </View>
      );
    }
    return null;
  }, [type]);

  return (
    <View style={[styles.toastContainer, borderStyle]}>
      <ToastIcon />
      <Text style={[styles.toastMesg, MesgColor]}>{message}</Text>
    </View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  toastMesg: {
    color: 'white',
  },
  toastIcon: {
    width: 20,
    height: 20,
  },
});
