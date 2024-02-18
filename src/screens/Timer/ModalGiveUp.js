import React from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import TextView from 'src/components/TextView';
import { AppTheme } from 'src/utils/appConstant';
import Button from 'src/components/Button';
import { View } from 'react-native-reanimated/mock';
import CancelImage from 'src/assets/images/timer/cancel.png';
import FastImage from 'react-native-fast-image';

const ModalGiveUp = ({ open, handleClose, onGiveUp }) => {
  return (
    <Modal
      isVisible={open}
      style={styles.view}
      swipeDirection={['up', 'left', 'right', 'down']}
    >
      <View style={styles.modalContentWrap}>
        <View style={styles.modalContent}>
          {/* <TextView style={styles.modalTitle}>Cancel Timer</TextView> */}
          <FastImage
            source={CancelImage}
            style={{ width: 80, height: 80, marginTop: 20 }}
          />
          <TextView style={styles.taskInfoWrap}>
            You almost get there. Are you sure want to {'\n'}
            <TextView
              style={{ color: AppTheme.colors.primary_1, fontWeight: 'bold' }}
            >
              GIVE UP?
            </TextView>
          </TextView>
        </View>
        <View style={styles.buttonWrap}>
          <Button
            style={styles.buttonCancel}
            text="Keep focus"
            textStyle={{ color: AppTheme.colors.primary_1 }}
            onPress={handleClose}
          />
          <Button
            style={styles.buttonDelete}
            text="Give up"
            onPress={onGiveUp}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalGiveUp;
const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
    position: 'relative',
  },
  modalContentWrap: {
    width: '100%',
    height: '30%',
    backgroundColor: '#fefefe',
    // backgroundColor: '#ccc',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalContent: {
    height: '65%',
    display: 'flex',
    alignItems: 'center',
  },
  modalTitle: {
    color: AppTheme.colors.primary_1,
    fontWeight: 700,
    fontSize: AppTheme.fontSize.s20,
    marginTop: 30,
  },
  buttonWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  buttonCancel: {
    backgroundColor: '#feecee',
    paddingHorizontal: 20,
    height: 60,
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonDelete: {
    backgroundColor: AppTheme.colors.primary_1,
    paddingHorizontal: 20,
    height: 60,
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  taskInfoWrap: {
    marginTop: 10,
    width: '90%',
    textAlign: 'center',
    fontSize: AppTheme.fontSize.s16,
  },
});
