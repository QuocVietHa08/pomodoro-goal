import React from 'react';
import { Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import styles from './Goal.styles';
const ModalDetailGoal = ({ isVisible, item, onClose }) => {
  return (
    <ReactNativeModal onBackdropPress={onClose} isVisible={isVisible}>
      <View style={styles.modalDetailGoal}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>{item?.title}</Text>
        <Text style={{ fontSize: 16 }}>{item?.content}</Text>
      </View>
    </ReactNativeModal>
  );
};

export default ModalDetailGoal;
