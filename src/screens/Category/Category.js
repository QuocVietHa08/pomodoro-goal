import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import HeaderWrap from 'src/components/HeaderWrap';
import styles from './Category.styles';
import { categories } from './mockData';
import newScope from 'src/assets/images/bottomTab/newScope.png';
import CategoryItem from './CategoryItem';
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
