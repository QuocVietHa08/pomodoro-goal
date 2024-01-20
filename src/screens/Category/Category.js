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

const validateSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  color: yup.string().required('Color is required'),
});

const Category = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState(categories);
  const [openModalAdd, setOpenModalAdd] = React.useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    resetField,
  } = useForm({
    defaultValues: {
      name: '',
      color: '',
    },
    resolver: yupResolver(validateSchema),
  });

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

  const handleChooseCategoryColor = colorPick => {
    setColor(colorPick);
    setValue('color', colorPick);
  };

  const handleAddCategory = () => {
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setOpenModalAdd(false);
    setTimeout(() => {
      resetField();
      setName('');
      setColor('');
    }, 500);
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
          <TextView>Add Category</TextView>
          <View style={styles.modalInputWrapper}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, valueName } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={valueName}
                  style={styles.inputStyle}
                />
              )}
              name="name"
              rules={{ required: true }}
            />
          </View>
          <TextView style={{ color: 'red' }}>{errors?.name?.message}</TextView>
          <View style={styles.modalColorPickWrapper}>
            {LIST_COLOR.map(colorItem => (
              <TouchableDebounce
                key={colorItem}
                style={{
                  borderWidth: 3,
                  borderRadius: 0,
                  borderColor:
                    color === colorItem ? AppTheme.colors.primary_1 : colorItem,
                }}
                onPress={() => handleChooseCategoryColor(colorItem)}
              >
                <View
                  style={[
                    styles.colorPickerItem,
                    { backgroundColor: colorItem },
                  ]}
                />
              </TouchableDebounce>
            ))}
            <TextView style={{ color: 'red' }}>
              {errors?.color?.message}
            </TextView>
          </View>
          <View style={styles.modalButtonWrapper}>
            <TouchableDebounce
              style={styles.buttonCancel}
              onPress={handleCloseModal}
            >
              <TextView style={{ color: 'white', fontWeight: 600 }}>
                Cancel
              </TextView>
            </TouchableDebounce>

            <TouchableDebounce
              style={styles.buttonSave}
              onPress={handleSubmit(handleAddCategory)}
            >
              <TextView style={{ color: 'white', fontWeight: 600 }}>
                Save
              </TextView>
            </TouchableDebounce>
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default Category;
