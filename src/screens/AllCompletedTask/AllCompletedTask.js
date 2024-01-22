import React, { useEffect, useState, useTransition } from 'react';
import { View } from 'react-native';
import styles from './AllCompletedTask.styles';
import HeaderWrap from 'src/components/HeaderWrap';
import { FlatList } from 'react-native-reanimated/mock';
import { tasks } from '../Statistics/mockData';
import TaskComp from 'src/components/Task';
import { Swipeable } from 'react-native-gesture-handler';
import TrashImage from 'src/assets/images/completedTask/trash.png';
import FastImage from 'react-native-fast-image';
import TouchableDebounce from 'src/components/TouchableDebounce';
import ModalDeleteTask from './ModalDeleteTask';

const TodayTask = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [itemChooese, setItemChoose] = useState(null);
  const [prevOpenedRow, setPrevOpenedRow] = useState(null);

  let row = [];

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, 500);
    }
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const handleOpenModalDelete = item => {
    setOpenModalDelete(true);
    setItemChoose(item);
  };

  const handleCloseModalDeleteItem = () => {
    prevOpenedRow.close();
    setTimeout(() => {
      setOpenModalDelete(false);
    }, 100);
  };

  const handleDeteleItem = () => {
    setOpenModalDelete(false);
  };

  const closeRow = index => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    setPrevOpenedRow(row[index]);
  };

  const renderItem = ({ item, index }, onClick) => {
    const renderRightActions = (progress, dragX, onClick) => {
      return (
        <TouchableDebounce onPress={onClick}>
          <View style={styles.deteleIconContainer}>
            <View style={styles.deleteIconWrap}>
              <FastImage source={TrashImage} style={styles.deleteIcon} />
            </View>
          </View>
        </TouchableDebounce>
      );
    };

    return (
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, () => {
            onClick();
          })
        }
        onSwipeableOpen={() => closeRow(index)}
        ref={ref => (row[index] = ref)}
        rightOpenValue={-100}
      >
        <View>
          <TaskComp {...item} />
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack={'All Completed Task (16)'} />
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={tasks}
        renderItem={({ item, index }) =>
          renderItem({ item, index }, () => {
            handleOpenModalDelete(item);
          })
        }
        keyExtractor={item => item.title}
      />
      <ModalDeleteTask
        onDelete={handleDeteleItem}
        open={openModalDelete}
        handleClose={handleCloseModalDeleteItem}
        item={itemChooese}
      />
    </View>
  );
};

export default TodayTask;
