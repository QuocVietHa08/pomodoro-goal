import React, { useEffect, useState } from 'react';
import { FlatList, TextInput, View } from 'react-native';
import HeaderWrap from 'src/components/HeaderWrap';
import styles from './Category.styles';
import { categories, LIST_COLOR } from './mockData';
import TextView from 'src/components/TextView';
import newScope from 'src/assets/images/bottomTab/newScope.png';
import CategoryItem from './CategoryItem';
import ReactNativeModal from 'react-native-modal';
import TouchableDebounce from 'src/components/TouchableDebounce';
import { AppTheme } from 'src/utils/appConstant';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { set } from 'lodash';
import ModalCreateCategory from './ModalCreateCategory';
import ModalEditCategory from './ModalEditCategory';

const Category = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState(categories);
  const [openModalAdd, setOpenModalAdd] = React.useState(false);
  const [categoryChoose, setCategoryChoose] = React.useState(null);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  const handleOpenModalAddCategory = () => {
    setOpenModalAdd(true);
  };

  const handleChooseCategory = item => {
    setCategoryChoose(item);
  };

  return (
    <View style={styles.container}>
      <HeaderWrap
        isBackMode
        titleBack="Category"
        rightIcons={newScope}
        rightIconStyle={styles.headerIconRight}
        onRightPress={handleOpenModalAddCategory}
      />
      <FlatList
        style={{ marginTop: 10 }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data}
        renderItem={({ item }) => (
          <CategoryItem onChoose={handleChooseCategory} item={item} />
        )}
      />
      <ModalCreateCategory
        openModalAdd={openModalAdd}
        setOpenModalAdd={setOpenModalAdd}
      />
      <ModalEditCategory
        openModalAdd={!!categoryChoose}
        item={categoryChoose}
        setOpenModalAdd={setCategoryChoose}
      />
    </View>
  );
};

export default Category;
