import React from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import TextView from 'src/components/TextView';
import Button from 'src/components/Button';
import { View } from 'react-native-reanimated/mock';
import { AppTheme } from 'src/utils/appConstant';

const ModalDeleteTask = ({ open, setOpen, onDelete, item }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      isVisible={open}
      style={styles.view}
      onSwipeComplete={() => setOpen(false)}
      swipeDirection={['up', 'left', 'right', 'down']}
    >
      <View style={styles.modalContentWrap}>
        <View style={styles.modalContent}>
          <TextView>hellos</TextView>
        </View>
        <View style={styles.buttonWrap}>
          <Button
            style={styles.buttonCancel}
            text="Cancel"
            textStyle={{ color: AppTheme.colors.primary_1 }}
            onPress={handleClose}
          />
          <Button
            style={styles.buttonDelete}
            text="Yes, Delete"
            onPress={onDelete}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalDeleteTask;
const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
    position: 'relative',
  },
  modalContentWrap: {
    width: '100%',
    height: '40%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalContent: {
    height: '70%',
    // backgroundColor: 'red',
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
});
