import React, { useCallback, useContext, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import HeaderWrap from 'src/components/HeaderWrap';
import styles from './Category.styles';
import { categories } from './mockData';
import newScope from 'src/assets/images/bottomTab/newScope.png';
import CategoryItem from './CategoryItem';
import ModalCreateCategory from './ModalCreateCategory';
import ModalEditCategory from './ModalEditCategory';
import AppwriteContext from 'src/utils/appwrite/AppwriteContext';
import { Toast, useToast } from 'react-native-toast-notifications';

const Category = () => {
  const toast = useToast();
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [openModalAdd, setOpenModalAdd] = React.useState(false);
  const [categoryChoose, setCategoryChoose] = React.useState(null);
  const { appwrite } = useContext(AppwriteContext);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }
  }, [refreshing]);

  const handleGetCategories = useCallback(() => {
    appwrite
      .getListDocument('65e98ac53efeea4c54ff', '65eeb7fc9834901cd066')
      .then(res => {
        setData(res?.documents);
      })
      .catch(() => {
        toast.show('Connection error', { type: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [appwrite]);

  useEffect(() => {
    setLoading(true);
    handleGetCategories();
  }, [handleGetCategories]);

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
        isShowAvatar={false}
        rightIconStyle={styles.headerIconRight}
        onRightPress={handleOpenModalAddCategory}
      />
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          style={{ marginTop: 10 }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={data}
          renderItem={({ item }) => (
            <CategoryItem onChoose={handleChooseCategory} item={item} />
          )}
        />
      )}
      <ModalCreateCategory
        openModalAdd={openModalAdd}
        setOpenModalAdd={setOpenModalAdd}
        onFetch={handleGetCategories}
      />
      <ModalEditCategory
        openModalAdd={!!categoryChoose}
        item={categoryChoose}
        setOpenModalAdd={setCategoryChoose}
        onFetch={handleGetCategories}
      />
    </View>
  );
};

export default Category;
