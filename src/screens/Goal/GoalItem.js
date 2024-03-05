import React from 'react';
import { View, Text } from 'react-native';
import styles from './Goal.styles';
import TouchableDebounce from 'src/components/TouchableDebounce';
import FastImage from 'react-native-fast-image';
import ArrowRight from 'src/assets/images/goal/arrow-right.png';
import ModalDetailGoal from './ModalDetailGoal';

const GoalItem = ({ item }) => {
  const [openDetailModal, setOpenDetailModal] = React.useState(false);
  const handleOpenModalDetail = () => {
    setOpenDetailModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailModal(false);
  };

  return (
    <>
      <TouchableDebounce
        onPress={handleOpenModalDetail}
        style={styles.goalItemWrap}
      >
        <View>
          <Text style={{ marginBottom: 5 }}>{item?.title}</Text>
          <Text>{item?.content}</Text>
        </View>
        <FastImage source={ArrowRight} style={{ width: 15, height: 15 }} />
      </TouchableDebounce>
      <ModalDetailGoal
        isVisible={openDetailModal}
        item={item}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default GoalItem;
