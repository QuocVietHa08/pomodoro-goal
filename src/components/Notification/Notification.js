import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextView from '../TextView';
import { AppTheme } from 'src/utils/appConstant';
import FastImage from 'react-native-fast-image';
import SuccessImg from 'src/assets/images/notification/success.png';
import CancelImg from 'src/assets/images/notification/cancel.png';
import ServiceImg from 'src/assets/images/notification/service.png';
import VertificationImg from 'src/assets/images/notification/vertification.png';

const NotificationComp = ({ title, subTitle, type }) => {
  const handleRenderImage = value => {
    const NOTI_IMG = {
      success: SuccessImg,
      cancel: CancelImg,
      service: ServiceImg,
      vertification: VertificationImg,
    };

    return NOTI_IMG[value];
  };

  return (
    <View style={styles.container}>
      <View>
        <FastImage
          source={handleRenderImage(type)}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </View>
      <View>
        <TextView style={styles.title}>{title}</TextView>
        <TextView style={styles.subTitle}>{subTitle}</TextView>
      </View>
    </View>
  );
};

export default NotificationComp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  title: {
    fontSize: AppTheme.fontSize.s16,
  },
  subTitle: {
    fontSize: AppTheme.fontSize.s14,
    color: AppTheme.colors.neutral_50,
  },
});
