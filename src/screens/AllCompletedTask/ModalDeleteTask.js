import React from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import TextView from 'src/components/TextView';
import Button from 'src/components/Button';
import { View } from 'react-native-reanimated/mock';
import { AppTheme } from 'src/utils/appConstant';
import TaskComp from 'src/components/Task';

const ModalDeleteTask = ({ open, handleClose, onDelete, item }) => {
  return (
    <Modal
      isVisible={open}
      style={styles.view}
      swipeDirection={['up', 'left', 'right', 'down']}
    >
      <View style={styles.modalContentWrap}>
        <View style={styles.modalContent}>
          <TextView style={styles.modalTitle}>Delete Task</TextView>
          <View style={styles.taskInfoWrap}>
            <TaskComp {...item} />
          </View>
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
    width: '90%',
  },
});
