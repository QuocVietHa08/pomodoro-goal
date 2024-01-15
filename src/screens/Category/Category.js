import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import HeaderWrap from 'src/components/HeaderWrap';
import styles from './Category.styles';
import { categories } from './mockData';
import TextView from 'src/components/TextView';
import newScope from 'src/assets/images/bottomTab/newScope.png';
import CategoryItem from './CategoryItem';
import ReactNativeModal from 'react-native-modal';
import TouchableDebounce from 'src/components/TouchableDebounce';

const Category = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState(categories);
  const [openModalAdd, setOpenModalAdd] = React.useState(false);

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
        renderItem={({ item }) => <CategoryItem item={item} />}
      />

      <ReactNativeModal isVisible={openModalAdd}>
        <View style={styles.modalAddCategory}>
          <TextView>Modal</TextView>
          <TouchableDebounce
            style={styles.buttonSave}
            onPress={() => setOpenModalAdd(false)}
          >
            <TextView style={{ color: 'white' }}>Save</TextView>
          </TouchableDebounce>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default Category;
